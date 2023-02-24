import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeTheme } from "../../types/TypeForAll";

const colorSettingsLocalStorage = window.localStorage.getItem('settingsColor')

const paletteColor:TypeTheme[] = colorSettingsLocalStorage!== null ? JSON.parse(colorSettingsLocalStorage) as TypeTheme[] :  [
    {color:'#ba4949' ,color2:'#c15c5c', color3:'#cd4040', color4:'#a44e4e' , num:1, focus:true,shortBreak:false,longBreak:false},
    {color:'#397097',color2:'#3c97d8', color3:'#2a7eba', color4:'#19486a' ,num:2, focus:false,shortBreak:true,longBreak:false},
    {color:'#a4893c',color2:'#be9b37', color3:'#a8882c', color4:'#836a23' ,num:3, focus:false,shortBreak:false,longBreak:false},
    {color:'#7d53a2',color2:'#6720a6', color3:'#5f1c9b', color4:'#582c7f' ,num:4, focus:false,shortBreak:false,longBreak:false},
    {color:'#af4e91',color2:'#9f357e', color3:'#802463', color4:'#8e1067' ,num:5, focus:false,shortBreak:false,longBreak:false},
    {color:'#518a58',color2:'#397640', color3:'#2b6632', color4:'#26572c' ,num:6, focus:false,shortBreak:false,longBreak:false},
    {color:'#545764',color2:'#3f4561', color3:'#1d2344', color4:'#293154' , num:7,focus:false,shortBreak:false,longBreak:true},
    {color:'#BCBA06',color2:'#d0ce26', color3:'#bebc1e', color4:'#9b9915' ,num:8, focus:false,shortBreak:false,longBreak:false}
]

export const ColorSlice = createSlice({
    name:'color',
    initialState:paletteColor,
    reducers:{
        updateGlobalSettingsColor : (state,action:PayloadAction<TypeTheme[]>) => {
            state = action.payload
            return state
        }
    }
})

export const { updateGlobalSettingsColor } = ColorSlice.actions

export default ColorSlice.reducer

