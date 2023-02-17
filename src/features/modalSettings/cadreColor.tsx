import { FunctionComponent, ReactElement, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateGlobalSettingsColor } from './colorSlice';
import { TypeTheme } from '../../types/TypeForAll';
import './styleCadreColor.css'

type PropsCadreColor = {
    type:string,
    checkIfThemeChanged: () => void
}

const CadreColor:FunctionComponent<PropsCadreColor> = ({type,checkIfThemeChanged}) => {
    const themeCheckedIcon:ReactElement<HTMLImageElement> = <img style={{position: "relative",top: "-7px",left: "15px"}} src="/imgs/check-without-border.svg" alt="" />
    const paletteColorGlobal = useAppSelector<TypeTheme[]>( state => state.colorSettings )
    const dispatch = useAppDispatch()
    const [themes,setTheme] = useState<TypeTheme[]>(paletteColorGlobal)
    const clickPanelColor = (themeNum:number) =>{
        checkIfThemeChanged()
        let temp = [...themes]
        temp = temp.map( theme => {
            let themeCopy = {...theme}
            if(themeCopy.num === themeNum){
                // document.body.style.backgroundColor = theme.color
                if( type==="pomodoro") themeCopy.focus = themeCopy.focus || !themeCopy.focus
                else if( type==="shortBreak") themeCopy.shortBreak = themeCopy.shortBreak || !themeCopy.shortBreak 
                else if( type==="longBreak") themeCopy.longBreak = themeCopy.longBreak || !themeCopy.longBreak 
            }
            else{
                if( type==="pomodoro") themeCopy.focus = false
                else if( type==="shortBreak") themeCopy.shortBreak = false
                else if( type==="longBreak") themeCopy.longBreak = false
            }
            return themeCopy
        } )
        dispatch(updateGlobalSettingsColor(temp)) 
        setTheme(temp)
    }

    return(
        <>
            {
                themes.map( theme => {
                    let showPaletteChecked = false
                    if(theme.focus && type==="pomodoro"){
                        showPaletteChecked = true
                    }
                    else if(theme.shortBreak && type==="shortBreak"){
                        showPaletteChecked = true
                    }
                    else if(theme.longBreak && type==="longBreak"){
                        showPaletteChecked = true
                    }
                    return [
                        <div 
                            key={theme.num} className="div-panel-color" 
                            style={{backgroundColor:theme.color}} 
                            onClick={ () => clickPanelColor(theme.num) } 
                        >
                            { showPaletteChecked  ? themeCheckedIcon : <>&nbsp;</> }
                        </div>
                    ]
                } )
            }
        </>
    )
}

export default CadreColor