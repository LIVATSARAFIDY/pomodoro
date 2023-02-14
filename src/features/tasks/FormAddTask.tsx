import React,{ FunctionComponent, useState } from "react"
import { useAppDispatch } from '../../app/hooks';
import { TypeTask } from "../../types/TypeForAll";
import { addTask } from "./TaskSlice";
type PropsForm = {
    actionToggle: () => void
}

const FormAddTask:FunctionComponent<PropsForm> = ({actionToggle}) => {
    const [valueInputNewTask,setValueInputNewTask] = useState<string>('')
    const [approximativeNbSession,setApproximativeNbSession] = useState<string>('0')
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        if(valueInputNewTask.trim() !== ''){
            const newTask:TypeTask = {
                id: Date.now(),text:valueInputNewTask.trim(),nbSessionPomo:+approximativeNbSession,note:'',active:false,
                nbPomoEffectif:0,status:false
            }
            dispatch(addTask(newTask))
            setValueInputNewTask('')
            setApproximativeNbSession('0')
        }
    }
    
    const changeApproximativeNbSession = (e:React.MouseEvent<HTMLButtonElement>,action:string) => {
        e.preventDefault()
        let temp:number = +approximativeNbSession
        switch (action) {
            case "minus":
                if(temp > 0) temp--
                break
            case "plus":
                temp++
                break
        
            default:
                break
        }
        setApproximativeNbSession(''+temp)
    }

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>):void => {
        setValueInputNewTask(e.target.value)
    }

    const cancelForm = (e:React.MouseEvent<HTMLButtonElement>):void => {
        e.preventDefault()
        actionToggle()
    }

    return (
        <div className="container-task">
            <form className="form-add-task" onSubmit={(e) => handleSubmit(e)}>
                <input 
                    type="text" 
                    name="newTask" 
                    placeholder="what are you working on?" 
                    value={valueInputNewTask} onChange={ (e) => handleChangeInput(e) } 
                />
                <br />
                <br />
                Nombre de session PomoDo pour cette tache&nbsp;&nbsp; 
                <input type="text" style={{width:"8%"}} value={ approximativeNbSession } readOnly />&nbsp;&nbsp; 
                <button onClick={ (e) => changeApproximativeNbSession(e,'minus') } >-</button>
                &nbsp;&nbsp;
                <button onClick={ (e) => changeApproximativeNbSession(e,'plus') } >+</button>
                <div className="footer-form" >
                    <button className="btn-action-form" onClick={ (e) => cancelForm(e) } >Cancel</button>
                    <button className="btn-action-form" >Save</button>
                </div>
            </form>
        </div>
    )
}

export default FormAddTask