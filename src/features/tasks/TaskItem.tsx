import { FunctionComponent } from "react";
import { TypeTask } from "../../types/TypeForAll";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { activeTaskItem } from "./TaskSlice";

type PropsTask = {
    task:TypeTask,
    showFormUdapteTask: (idTask:number) => void
}

const TaskItem:FunctionComponent<PropsTask> = ({task,showFormUdapteTask}) => {

   const dispatch = useAppDispatch()
//    const 

    const activeItem = (idTask:number) => {
        dispatch(activeTaskItem(idTask))
    }

    return (
        <>
            <div className={` list-task ${ task.active ? "task-active":"" } `}  >
                <img src={ task.status ? "/imgs/check-item-finished.svg" : "/imgs/check-item.svg" } alt="" onClick={ () => activeItem(task.id) } style={{ cursor:"pointer" }}  />
                <span className="text-add-task" > { task.text } {task.nbPomoEffectif}/{task.nbSessionPomo} </span>
                <button className="btn-action-item-task"   onClick={ () => showFormUdapteTask(task.id) } >
                    <img src="/imgs/three-point.svg" alt=""  style={{cursor:"pointer",width:"20px",marginTop:"5px"}}  />
                </button>
            </div>
        </>
    )
}

export default TaskItem