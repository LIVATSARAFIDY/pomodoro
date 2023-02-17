import { FunctionComponent, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import './style.css'

type PropsBtn = {
    actionToggle: () => void
}

const BtnAddTask:FunctionComponent<PropsBtn> = ({actionToggle}) => {
    const [hover, setHover] = useState<boolean>(false);
    const settingsColor = useAppSelector(state => state.colorSettings) 
    const handleMouseEnter = () => {
        setHover(true);
      };
    
      const handleMouseLeave = () => {
        setHover(false);
      };  
    return (
        <div className="container-task" onClick={actionToggle} >
            <div className="btn-add-task "
                style={{backgroundColor: hover ? 'yellow' : 'blue'}}
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