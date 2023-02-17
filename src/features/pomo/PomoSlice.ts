import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PomoParams {
    focus:number,
    shortBreak:number,
    longBreak:number
} 

const timerInLocalStorage = window.localStorage.getItem('timer')
const timerDefaultvalue = timerInLocalStorage && JSON.parse(timerInLocalStorage)
const focusTimer = (timerDefaultvalue) ? timerDefaultvalue?.focus : 1500
const shortBreakTimer = (timerDefaultvalue) ? timerDefaultvalue?.shortBreak : 300
const longBreakTimer = (timerDefaultvalue) ? timerDefaultvalue?.longBreak : 900
const initialState: PomoParams|any = { focus:focusTimer,shortBreak:shortBreakTimer,longBreak:longBreakTimer }

export const PomoSlice = createSlice({
    name:'pomo',
    initialState,
    reducers:{
        updateTimeToFocus: (state:PomoParams,action:PayloadAction<number>) => {
            state.focus = action.payload*60
        },
        updateTimeToShortBreak: (state:PomoParams,action:PayloadAction<number>) => {
            state.shortBreak  = action.payload*60
        },
        updateTimeToLongBreak: (state:PomoParams,action:PayloadAction<number>) => {
            state.longBreak  = action.payload*60
        },
        play: (state,action:PayloadAction<string>) => {
            if(state[action.payload]> 0) state[action.payload] -= 1
        },
        undo: (state,action:PayloadAction<string>) => {
            state[action.payload] = initialState[action.payload]
        }
    }
})
export const { 
    updateTimeToFocus,updateTimeToShortBreak,updateTimeToLongBreak,
    play, undo
} = PomoSlice.actions;
export default PomoSlice.reducer;