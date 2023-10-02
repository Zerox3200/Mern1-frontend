import { configureStore } from "@reduxjs/toolkit";
import TasksReducer from './Reducers/slice.js'

export const store = configureStore({
    reducer: {
        Tasks: TasksReducer
    }
})