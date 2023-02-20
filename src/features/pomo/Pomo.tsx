import React,{ useState, useEffect, useRef, useReducer, FunctionComponent } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearListTask, updateOneTask } from "../tasks/TaskSlice";
import { changeTimerActif } from "../typeTimerActif/timerActifSlice";
import { TypeTask,TypeTheme } from "../../types/TypeForAll";

import './style.css'

type TypeTime = {
    focus:number,
    shortBreak:number,
    longBreak:number
}

const Pomo:FunctionComponent = () => {
    const typeTimerActif = useAppSelector(state => state.timerActif )
    const [timerForFocusIsEnd,setTimerForFocusIsEnd] = useState<boolean>(false)
    const [timerForBerakIsEnd,setTimerForBreakIsEnd] = useState<boolean>(false)
    const [session,setSession] = useState<number>(0)
    const [btnPlayPause,setBtnPlayPause] = useState<boolean>(false)
    const [cycle,setCycle] = useState<number>(0)
    const [textCurrentAction] = useState<any>({focus:'Time to focus!',shortBreak:'Time for a short break',longBreak:'Time for long break'})
    const [typeTimeActif,setTypeTimeActif] = useState<string>(typeTimerActif)
    const focus =  useAppSelector(state => state.pomo.focus)
    const shortBreak =  useAppSelector(state => state.pomo.shortBreak)
    const longBreak =  useAppSelector(state => state.pomo.longBreak)
    const settingsColor = useAppSelector(state => state.colorSettings)
    const tasks =  useAppSelector(state => state.task)
    const [time,setTime] = useState<TypeTime>({focus:0,shortBreak:0,longBreak:0})
    const intervalRef = useRef<ReturnType<typeof setInterval>|undefined>(undefined)
    const dispatch = useAppDispatch();

    const pushNotification = () => {
        // const text = (typeTimeActif === 'focus') ? "Time to focus" : (typeTimeActif === 'shortBreak' ? "Time to take short break" : "Time to take long break")
        const text = (typeTimerActif === 'focus') ? "Time to focus" : (typeTimeActif === 'shortBreak' ? "Time to take short break" : "Time to take long break")
        new Notification(text)
    };

    const reducer = (state:{focus:number,shortBreak:number,longBreak:number},action:{typeAction:string,typeTime:string}) => {
        switch(action.typeAction){
            case 'tick':
                let tempTime:any = {...time}
                tempTime[action.typeTime] = +tempTime[action.typeTime] - 1
                state = tempTime
                if(tempTime[action.typeTime] === 0){
                    if(action.typeTime === 'focus'){
                        tempTime = {focus:+focus,shortBreak:+shortBreak,longBreak:+longBreak}
                        const nbSession = session
                        const nbCycle = cycle
                        window.localStorage.setItem('stateLocalStorage',JSON.stringify({nbSession:(nbSession + 1)}))
                        setSession(nbSession + 1)
                        setCycle(nbCycle+1)
                        setTimerForFocusIsEnd(true)
                        setBtnPlayPause(!btnPlayPause)
                        if(cycle < 3){
                            setTypeTimeActif('shortBreak')
                            dispatch(changeTimerActif('shortBreak'))
                        }
                        else{
                            setCycle(0)
                            setTypeTimeActif('longBreak')
                            dispatch(changeTimerActif('longBreak'))
                        }
                    }
                    else if(action.typeTime === 'shortBreak'){
                        setBtnPlayPause(!btnPlayPause)
                        tempTime = {focus:+focus,shortBreak:+shortBreak,longBreak:+longBreak}
                        setTypeTimeActif('focus')
                        dispatch(changeTimerActif('focus'))
                        setTimerForBreakIsEnd(true)
                    }
                    else if(action.typeTime === 'longBreak'){
                        setBtnPlayPause(!btnPlayPause)
                        setTypeTimeActif('focus')
                        dispatch(changeTimerActif('focus'))
                        setTimerForBreakIsEnd(true)
                    }
                }
                setTime({...tempTime})
                return state
            default:
                throw new Error()
        }
    }
    const clearIntervalId = () => {
        const intervalId = intervalRef.current
        if(intervalId) clearInterval(+intervalId)
    }
    const [state,dispatcher] = useReducer(reducer,{focus:+focus,shortBreak:+shortBreak,longBreak:+longBreak})
    

    useEffect(() => {

        setTime({focus:focus,shortBreak:shortBreak,longBreak:longBreak})
        clearIntervalId()
        Notification.requestPermission();
        let taskActive:TypeTask = {...tasks.filter( task => task.active )[0]}
        const getDataLocalSorage = window.localStorage.getItem('stateLocalStorage')
        if(getDataLocalSorage){
            const dataStorage:any = JSON.parse(getDataLocalSorage)
            setSession(dataStorage.nbSession)
        }
        else{
            window.localStorage.setItem('stateLocalStorage',JSON.stringify({nbSession:0}))   
        }
        if(btnPlayPause){
            const intervalId:ReturnType<typeof setInterval>|undefined = setInterval(() => { 
                // dispatcher({typeAction:'tick',typeTime:typeTimeActif})
                dispatcher({typeAction:'tick',typeTime:typeTimerActif})
            } , 1000)
            intervalRef.current = intervalId;
        }
        if(timerForFocusIsEnd){
            
            if(Object.keys(taskActive).length > 0){
                taskActive.nbPomoEffectif += 1
                dispatch(updateOneTask(taskActive))
            }
            pushNotification()
        }
        if(timerForBerakIsEnd){
            pushNotification()
        }
        
        const divPomoTimer = Array.from(document.getElementsByClassName('pomoTimer') as HTMLCollectionOf<HTMLElement>)[0];
        const btnMenu = Array.from(document.getElementsByClassName('btnMenu') as HTMLCollectionOf<HTMLElement>);
        const btnMenuActif = Array.from(document.getElementsByClassName('btn-menu-actif') as HTMLCollectionOf<HTMLElement>)[0];
        let themeActive:TypeTheme;
        // if(typeTimeActif === 'focus'){
        if(typeTimerActif === 'focus'){
            themeActive = settingsColor.filter(theme => theme.focus === true )[0]   
        }
        // else if(typeTimeActif === 'shortBreak'){
        else if(typeTimerActif === 'shortBreak'){
            themeActive = settingsColor.filter(theme => theme.shortBreak === true )[0]
        }
        else{
            themeActive = settingsColor.filter(theme => theme.longBreak === true )[0]
        }
        document.body.style.backgroundColor = themeActive.color
        divPomoTimer.style.backgroundColor = themeActive.color2
        btnMenu.forEach(box => {
            box.style.backgroundColor = 'white'
        });
        btnMenuActif.style.backgroundColor = themeActive.color4
        
    // },[btnPlayPause,timerForFocusIsEnd,timerForBerakIsEnd,focus,shortBreak,longBreak,typeTimeActif])
    },[btnPlayPause,timerForFocusIsEnd,timerForBerakIsEnd,focus,shortBreak,longBreak,typeTimerActif])

    const btnUndo = () => {
        setTime({focus:+focus,shortBreak:+shortBreak,longBreak:+longBreak})
        setBtnPlayPause(false)
    }
    const onChangeTypeTimeActif = (type:string):void => {
        clearIntervalId()
        setTypeTimeActif(type)
        dispatch(changeTimerActif(type))
        btnUndo()
    }
    const toogleBtnPlayPause = () => {
        setBtnPlayPause(!btnPlayPause)
        setTimerForFocusIsEnd(false)
        setTimerForBreakIsEnd(false)
    }
    const formatTimer = (time:number,typeTime:string):string => {
        if(time>=0){
            const timeFormated = new Date(time * 1000).toISOString().substring(14, 19)
            return ''+timeFormated
        }
        else{
            clearIntervalId()
            return '00:00'
        }
    }
    const resetPomo = () => {
        window.localStorage.clear()
        setSession(0)
        btnUndo()
        dispatch(clearListTask())
        setTypeTimeActif('focus')
        dispatch(changeTimerActif('focus'))
    }
    return (
        <div className="pomo-container">
            <div className="pomoTimer"  >
                <div className="pomo-menu alignToCenter" >
                    <span className="pomo-menu-item" >
                        {/* <button  className={`btnMenu ${ typeTimeActif === 'focus' ? 'btn-menu-actif':'' } `} onClick={() => onChangeTypeTimeActif('focus')}>Focus</button> */}
                        <button  className={`btnMenu ${ typeTimerActif === 'focus' ? 'btn-menu-actif':'' } `} onClick={() => onChangeTypeTimeActif('focus')}>Focus</button>
                    </span>
                    <span className="pomo-menu-item" >
                        {/* <button className={`btnMenu ${ typeTimeActif === 'shortBreak' ? 'btn-menu-actif':'' } `} onClick={() => onChangeTypeTimeActif('shortBreak')} >Short break</button> */}
                        <button className={`btnMenu ${ typeTimerActif === 'shortBreak' ? 'btn-menu-actif':'' } `} onClick={() => onChangeTypeTimeActif('shortBreak')} >Short break</button>
                    </span>
                    <span className="pomo-menu-item" >
                        {/* <button className={`btnMenu ${ typeTimeActif === 'longBreak' ? 'btn-menu-actif':'' } `} onClick={() => onChangeTypeTimeActif('longBreak')} >Long break</button> */}
                        <button className={`btnMenu ${ typeTimerActif === 'longBreak' ? 'btn-menu-actif':'' } `} onClick={() => onChangeTypeTimeActif('longBreak')} >Long break</button>
                    </span>
                </div>
                <div className="timer alignToCenter">
                    {
                        // typeTimeActif === 'focus' ? formatTimer(time.focus,'focus') : ( typeTimeActif === 'shortBreak' ? formatTimer(time.shortBreak,'shortBreak') : formatTimer(time.longBreak,'longBreak') )
                        typeTimerActif === 'focus' ? formatTimer(time.focus,'focus') : ( typeTimerActif === 'shortBreak' ? formatTimer(time.shortBreak,'shortBreak') : formatTimer(time.longBreak,'longBreak') )
                    }
                </div>
                <div className="groupBtnAction alignToCenter" >
                    <button className="btnAction" onClick={ toogleBtnPlayPause }  >
                        <img src={ !btnPlayPause ? "/imgs/play-g.svg" : "/imgs/pause-circle.svg" } alt=""  />
                    </button>
                    <button className="btnAction" onClick={  btnUndo }  >
                        <img src="/imgs/init.svg" alt="" />
                    </button>
                    <button className="btnAction" onClick={  resetPomo }  >
                        <img src="/imgs/undo.svg" alt="" />
                    </button>
                </div>
            </div>
            <div className="recap-session alignToCenter">
                Session PomoDo #{ session }<br />
                {/* { textCurrentAction[typeTimeActif] } */}
                { textCurrentAction[typeTimerActif] }
                {/* { textCurrentAction[typeTimeActif] } { (typeTimeActif === "focus" && textTaskActive !== "") ? textTaskActive : "" } */}
            </div>
        </div>
    )
}

export default Pomo