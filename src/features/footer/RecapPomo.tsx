import { FunctionComponent, useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import './style.css'
const RecapPomo:FunctionComponent = () => {

    const tasks = useAppSelector(state => state.task)
    const focusDuration = useAppSelector(state => state.pomo.focus)
    const [nbPomosForAllTasks, setNbPomosForAllTasks] = useState<number>(0)
    const [nbPomosEffetiveTotal,setNbPomosEffetiveTotal] = useState<number>(0)
    const [totalTimeToFocus,setTotalTimeToFocus] = useState<number>(0)
    const [timeToFocusLeft,setTimeToFocusLeft] = useState<number>(0)
    useEffect( () => {
        if(tasks.length > 0){
            let tempNpPomos:number = 0
            let cumulPomoEffective = 0
            tasks.map( task => {
                tempNpPomos += task.nbSessionPomo
                cumulPomoEffective += task.nbPomoEffectif
                return true
            })
            setNbPomosForAllTasks(tempNpPomos)
            setNbPomosEffetiveTotal(cumulPomoEffective)
            setTotalTimeToFocus(focusDuration*tempNpPomos)
            setTimeToFocusLeft((tempNpPomos - cumulPomoEffective)*focusDuration)
        }
        else{
            setNbPomosForAllTasks(0)
        }
    },[tasks])

    const formatTimer = (time:number):string => {
        if(time>=0){
            const timeFormated = new Date(time * 1000).toISOString().substring(14, 19)
            return ''+timeFormated
        }
        else{
            return '00:00'
        }
    }

    return (
        <div className="container-footer" >
            <div className="block-recap">
                Pomodos:{' '} 
                <span className="nb-pomo" >{ nbPomosEffetiveTotal }</span>
                /
                <span className="nb-pomo" >{nbPomosForAllTasks}</span>{' | '}
                Total time to focus <span className="nb-pomo">{ formatTimer(totalTimeToFocus) }</span>{' '}
                min{' | '}
                Remaining focus time <span className="nb-pomo">{ formatTimer(timeToFocusLeft) }</span> min
            </div>
        </div>
    )
}

export default RecapPomo