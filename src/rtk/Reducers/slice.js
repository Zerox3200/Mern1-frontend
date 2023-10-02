import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const FetchedTasks = createAsyncThunk("Tasks/FetchedTasks", async (Link) => {
    const CalledTasks = await fetch(Link);
    const Finale_Result = await CalledTasks.json();
    return Finale_Result;
})

const TasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(FetchedTasks.pending, (state, action) => {
            console.log("Pending")
        })
        builder.addCase(FetchedTasks.fulfilled, (state, action) => {
            return action.payload
        })
    },

})

export default TasksSlice.reducer