import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PomoParams {
    focus:number,
    shortBreak:number,
    longBreak:number
} 

const initialState: PomoParams|any = { focus:2,shortBreak:2,longBreak:2 }

export const PomoSlice = createSlice({
    name:'pomo',
    initialState,
    reducers:{
        updateTimeToFocus: (state:PomoParams,action:PayloadAction<number>) => {
            state.focus = action.payload
        },
        updateTimeToShortBreak: (state:PomoParams,action:PayloadAction<number>) => {
            state.shortBreak  = action.payload
        },
        updateTimeToLongBreak: (state:PomoParams,action:PayloadAction<number>) => {
            state.longBreak  = action.payload
        },
        play: (state,action:PayloadAction<string>) => {
            if(state[action.payload]> 0) state[action.payload] -= 1
        },
        pause: (state,action:PayloadAction<string>) => {
        },
        undo: (state,action:PayloadAction<string>) => {
            state[action.payload] = initialState[action.payload]
        }
    }
})
export const { 
    updateTimeToFocus,updateTimeToShortBreak,updateTimeToLongBreak,
    play, pause, undo
} = PomoSlice.actions;
export default PomoSlice.reducer;