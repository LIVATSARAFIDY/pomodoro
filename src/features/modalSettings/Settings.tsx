import { FunctionComponent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import CadreColor from './cadreColor';
import { updateTimeToFocus, updateTimeToShortBreak, updateTimeToLongBreak } from '../pomo/PomoSlice';
import './style.css'

type TypeSettings = {
    desactiveModal: () => void
}

const Settings:FunctionComponent<TypeSettings> = ({desactiveModal}) => {
    const colorSettings = useAppSelector(state =>state.colorSettings)
    const {focus,shortBreak,longBreak} = useAppSelector( state => state.pomo )
    const [timeForFocus,setTemForFocus] = useState<number>(0)
    const [timeForShortBreak,setTemForShortBreak] = useState<number>(0)
    const [timeForLongBreak,setTemForLongBreak] = useState<number>(0)
    const [themeIsChanged,setThemeIsChanged] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    useEffect( () => {
        setTemForFocus( Math.round(focus/60))
        setTemForShortBreak( Math.round(shortBreak/60))
        setTemForLongBreak( Math.round(longBreak/60))
    },[])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>,type:string):void => {
        switch (type) {
            case "focus":
                setTemForFocus(+e.target.value)      
                break;
            case "shortBreak":
                setTemForShortBreak(+e.target.value)      
                break;
            case "longBreak":
                setTemForLongBreak(+e.target.value)      
                break;
            default:
                break;
        }
    }

    const saveSettings = ():void => {
        dispatch(updateTimeToFocus(timeForFocus))
        dispatch(updateTimeToShortBreak(timeForShortBreak))
        dispatch(updateTimeToLongBreak(timeForLongBreak))
        window.localStorage.setItem('timer',JSON.stringify({focus:timeForFocus*60,shortBreak:timeForShortBreak*60,longBreak:timeForLongBreak*60}))
        if(themeIsChanged){
            document.body.style.backgroundColor = colorSettings[2].color2
        }
        setThemeIsChanged(false)
        desactiveModal()
    }
    return (
        <div className="container-settings">
            <div className="modal-settings">
                <div className="modal-head" >
                    <span className="text-head">Settings</span>
                    <span onClick={desactiveModal} >
                        <img src="/imgs/close.svg" alt="" style={{ float:"right", cursor:"pointer" }}  />
                    </span>
                </div>
                <div className="modal-body">
                    <div className="block-section" >
                        <span>
                            <img src="/imgs/timer.svg" alt="" /> <span className="title-section">Timer (minutes)</span>
                        </span>
                        <br /><br />
                        <div className="content-timer" >
                            Pomodoro<br />
                            <input type="number" value={ timeForFocus } onChange={ (e) =>handleChange(e,'focus')  } />
                        </div>
                        <div className="content-timer" >
                            short Break<br />
                            <input type="number" value={ timeForShortBreak } onChange={ (e) => handleChange(e,'shortBreak') } />
                        </div>
                        <div className="content-timer" >
                            Long Break<br />
                            <input type="number" value={ timeForLongBreak } onChange={ (e) => handleChange(e,'longBreak') } />
                        </div>
                    </div>
                    <hr />
                    <div className="block-section">
                        <span>
                            <img src="/imgs/theme.svg" alt="" /> <span className="title-section">Color Theme </span>
                        </span>
                        <br /><br />
                        <div className="content-theme" >
                            Pomodoro<br />
                            <CadreColor type="pomodoro" checkIfThemeChanged={ () => setThemeIsChanged(true) } />
                        </div>
                        <div className="content-theme" >
                            Short break<br />
                            <CadreColor type="shortBreak" checkIfThemeChanged={ () => setThemeIsChanged(true) } />
                        </div>
                        <div className="content-theme" >
                            Long break<br />
                            <CadreColor type="longBreak" checkIfThemeChanged={ () => setThemeIsChanged(true)} />
                        </div>
                    </div>
                </div>
                <div className="modal-footer" >
                    <button  onClick={ saveSettings } >Save</button>
                </div>
            </div>
        </div>
    )
}

export default Settings