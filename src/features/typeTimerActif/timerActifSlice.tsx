import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState:string = 'focus'

export const TimerActifSlice = createSlice({
    name:'typeTimer',
    initialState,
    reducers:{
        changeTimerActif: (state,action:PayloadAction<string>) => {
            return state = action.payload
        }
    }
})

export const { changeTimerActif } = TimerActifSlice.actions

export default TimerActifSlice.reducer