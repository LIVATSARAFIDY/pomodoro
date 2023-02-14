import { FunctionComponent, Fragment, useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import './style.css'
import TaskItem from './TaskItem'
import { TypeTask } from '../../types/TypeForAll' 
import FormUpdateTask from './FormUpdateTask'

const TaskList:FunctionComponent = () => {

    const [itemActiveForUpdate,setItemActiveForUpdate] = useState<number>(0)

    useEffect( () => {

    }, [itemActiveForUpdate])

    const tasks = useAppSelector(state => state.task)
    
    const showFormUdapteTask = (idTask:number) => {
        setItemActiveForUpdate(idTask)
    }
    const hideFormUpdateTask = () => setItemActiveForUpdate(0)

    return(
        <div className="container-task">
            <div className="block-title">
                <h1 style={{display:"inline"}}>
                    Tasks
                </h1>
                <img src='/imgs/list.svg' style={{float:"right"}} alt="" />

            </div>
            <>
                {
                    tasks.map( (task:TypeTask) => {
                        return (
                            <Fragment key={task.id} >
                                {
                                    (itemActiveForUpdate !== task.id ) ?<TaskItem  task={ task } showFormUdapteTask={ showFormUdapteTask } /> : <FormUpdateTask hideFormUpdateTask={ hideFormUpdateTask } task={ task }  />
                                }
                            </Fragment>
                        )
                    } )
                }
            </>
        </div>
    )
}

export default TaskList