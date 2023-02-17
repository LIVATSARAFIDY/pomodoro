import { FunctionComponent, useEffect,useRef, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import './style.css'
const RecapPomo:FunctionComponent = () => {

    const tasks = useAppSelector(state => state.task)
    const [nbPomosForAllTasks, setNbPomosForAllTasks] = useState<number>(0)
    const {focus} =  useAppSelector(state => state.pomo)
    useEffect( () => {
        if(tasks.length > 0)
        tasks.map( task => {
            let tempNpPomos:number = 0
            tempNpPomos += task.nbSessionPomo
            setNbPomosForAllTasks(tempNpPomos)
        })
        else{
            setNbPomosForAllTasks(0)
        }
    },[tasks])

    const formatTimer = (time:number):string => {
        const tempsTamp = Date.now()
        const tempsTampAdd = tempsTamp + (nbPomosForAllTasks*focus*1000)
        
        // return ''
        return new Date(tempsTampAdd).toLocaleTimeString()
        
    }

    return (
        <div className="container-footer" >
            <div className="block-recap">
                Pomodos: <span className="nb-pomo" >2</span>/<span className="nb-pomo" >{nbPomosForAllTasks}</span> Finish at <span className="nb-pomo">{ formatTimer((Date.now() + (nbPomosForAllTasks*focus))) }</span>
            </div>
        </div>
    )
}

export default RecapPomo