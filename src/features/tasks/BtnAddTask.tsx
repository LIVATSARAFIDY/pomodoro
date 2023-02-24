import { FunctionComponent, useState, useEffect } from 'react'
import { useAppSelector } from '../../app/hooks'
import { TypeTheme } from '../../types/TypeForAll'
import './style.css'

type PropsBtn = {
    actionToggle: () => void
}

const BtnAddTask:FunctionComponent<PropsBtn> = ({actionToggle}) => {
    const [hover, setHover] = useState<boolean>(false);
    const typeTimerActif = useAppSelector(state => state.timerActif )
    const settingsColor = useAppSelector(state => state.colorSettings)
    const checkIfPomoIsSettings = useAppSelector(state => state.settings)
    const [colorHover,setColorHover] = useState<string>('')
    const [color,setColor] = useState<string>('')
    
    useEffect( () => {
        let themeFound:TypeTheme
        if(typeTimerActif === 'focus'){
            themeFound = settingsColor.filter(theme => theme.focus === true )[0]   
        }
        else if(typeTimerActif === 'shortBreak'){
            themeFound = settingsColor.filter(theme => theme.shortBreak === true )[0]
        }
        else{
            themeFound = settingsColor.filter(theme => theme.longBreak === true )[0]
        }
        setColorHover(themeFound.color3)
        setColor(themeFound.color2)
        
    },[typeTimerActif,checkIfPomoIsSettings])

    const handleMouseEnter = () => {
        setHover(true);
      };
    
    const handleMouseLeave = () => {
        setHover(false);
    };  
    return (
        <div className="container-task" onClick={actionToggle} >
            <div className="btn-add-task "
                style={{backgroundColor: hover ? colorHover : color}}
                onMouseEnter={ handleMouseEnter } onMouseLeave={ handleMouseLeave } >
                <img src="/imgs/add.svg" alt="" />
                <span className="text-add-task">
                    Add Task
                </span>
            </div>
        </div>
    )
}

export default BtnAddTask