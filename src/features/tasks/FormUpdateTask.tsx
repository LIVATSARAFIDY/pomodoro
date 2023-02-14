import React,{ FunctionComponent, useState } from "react"
import { TypeTask } from "../../types/TypeForAll"
import { useAppDispatch } from "../../app/hooks"
import { deleteTask,updateOneTask } from "./TaskSlice"


type PorpsFormUpdateTask = {
    task:TypeTask,
    hideFormUpdateTask: () => void
}

const FormUpdateTask:FunctionComponent<PorpsFormUpdateTask> = ({task,hideFormUpdateTask}) => {

    const [taskLocal,setTaskLocal] = useState<TypeTask>(task)
    const [statusTask,setStatusTask] = useState<boolean>(taskLocal.status)
    const dispatch = useAppDispatch()

    const handelChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        const taskTemp = {...taskLocal}
        taskTemp.text = e.target.value
        setTaskLocal(taskTemp)
    }
    const handelChangeTextArea = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        const taskTemp = {...taskLocal}
        taskTemp.note = e.target.value
        setTaskLocal(taskTemp)
    }

    const changeApproximativeNbSession = (e:React.MouseEvent<HTMLButtonElement>,action:string) => {
        e.preventDefault()
        const taskTemp = {...taskLocal}
        switch (action) {
            case "minus":
                if(taskTemp.nbSessionPomo > 0) taskTemp.nbSessionPomo--
                break
            case "plus":
                taskTemp.nbSessionPomo++
                break
        
            default:
                break
        }
        setTaskLocal(taskTemp)
    }
    const handleChangeInputStatus = (e:React.ChangeEvent<HTMLInputElement>) => {
        const tempTask = {...taskLocal, status:e.target.checked  }
        setStatusTask(e.target.checked)
        setTaskLocal(tempTask)

    }
    const saveUpdateTask = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(updateOneTask(taskLocal))
        hideFormUpdateTask()
    }
    return (
        <>
            <div className="form-modif-task-item" >
                <form className="form-update-task" >
                    <input type="text"  name="updateTask" value={ taskLocal.text } onChange={ (e) => handelChangeInput(e) } /> 
                    <br /><br />
                    Nombre de session PomoDo pour cette tache&nbsp;&nbsp; 
                    <input type="text" style={{width:"8%"}} value={ taskLocal.nbSessionPomo } readOnly />&nbsp;&nbsp; 
                    <button onClick={ (e) => changeApproximativeNbSession(e,'minus') } >-</button>
                     &nbsp;&nbsp;
                    <button  onClick={ (e) => changeApproximativeNbSession(e,'plus') } >+</button>
                    <br />
                    <input type="checkbox" name="status" checked={statusTask} onChange={ e => handleChangeInputStatus(e) } /><span className="label-txt" >fini</span>
                    <br />
                    <textarea placeholder="Notes" value={ taskLocal.note } onChange={ (e) => handelChangeTextArea(e) } ></textarea>
                    <div style={{textAlign:"center"}} >
                    <button className="btn-action-form" onClick={ (e) => { e.preventDefault(); hideFormUpdateTask()} } >Cancel</button>
                    <button className="btn-action-form" onClick={ (e) => { e.preventDefault();dispatch(deleteTask(taskLocal.id))} } >Delete</button>
                    <button className="btn-action-form" onClick={(e) => saveUpdateTask(e) }  >Save</button>
                </div>
                </form>
            </div>
        </>
    )
}

export default FormUpdateTask