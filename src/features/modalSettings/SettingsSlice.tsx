import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:boolean = false

export const SettingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
        turnOneSettingsPomo: (state:boolean,action:PayloadAction<boolean>) => {
            return state = action.payload
        },
        turnOffSettingsPomo: (state:boolean,action:PayloadAction<boolean>) => {
            return state = action.payload
        }
    }
})

export const { turnOneSettingsPomo, turnOffSettingsPomo} = SettingsSlice.actions

export default  SettingsSlice.reducer