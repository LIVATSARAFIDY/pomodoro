import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeTask } from "../../types/TypeForAll";

const getTaskInLocalStorage = window.localStorage.getItem('listTask')

const initialState:TypeTask[] = getTaskInLocalStorage ? JSON.parse(getTaskInLocalStorage) : []

export const TaskSlice = createSlice({
    name:"task",
    initialState,
    reducers:{
        addTask: (state,action:PayloadAction<TypeTask>) => {
            // console.log("addTask",action.payload) 
            state.push({...action.payload})
            // console.log(state)
            window.localStorage.setItem('listTask',JSON.stringify(state))
        },
        deleteTask: (state,action:PayloadAction<number>) => {
            state = state.filter( task => task.id !== action.payload )
            window.localStorage.setItem('listTask',JSON.stringify(state))
            return state
        },
        clearListTask: (state) => {
            state = [] 
            return state 
        },
        activeTaskItem: (state,action:PayloadAction<number>) => {
            state = state.map( s => {
                if(s.id === action.payload) s.active = !s.active
                else s.active = false
                return s
            })
        },
        updateOneTask: (state,action:PayloadAction<TypeTask>) => {
            state = state.map( s => {
                return (s.id === action.payload.id) ? action.payload : s
            })
            window.localStorage.setItem('listTask',JSON.stringify(state))
            return state
        }
    }

})

export const { addTask, deleteTask, clearListTask, activeTaskItem, updateOneTask } = TaskSlice.actions

export default TaskSlice.reducer