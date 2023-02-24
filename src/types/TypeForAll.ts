import { EnumType } from "typescript"

export type TypeTask = {
    id:number,
    text:string,
    active:boolean,
    nbSessionPomo:number,
    nbPomoEffectif:number,
    note:string,
    status:boolean
}

export type TypeTheme = {
    color:string,
    color2:string,
    color3:string,
    color4:string,
    num: number,
   
    focus:boolean,
    shortBreak:boolean,
    longBreak:boolean
    
}
