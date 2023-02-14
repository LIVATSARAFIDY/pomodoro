import { FunctionComponent } from 'react'

import './style.css'

type PropsBtn = {
    actionToggle: () => void
}

const BtnAddTask:FunctionComponent<PropsBtn> = ({actionToggle}) => {

    return (
        <div className="container-task" onClick={actionToggle} >
            <div className="btn-add-task ">
                <img src="/imgs/add.svg" alt="" />
                <span className="text-add-task">
                    Add Task
                </span>
            </div>
        </div>
    )
}

export default BtnAddTask