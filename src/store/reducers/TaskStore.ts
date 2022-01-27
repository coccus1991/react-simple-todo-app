import TaskEntity from '../../entities/TaskEntity'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TaskStoreStateInterface {
  tasks: TaskEntity[]
}

const initialState: TaskStoreStateInterface = {
  tasks: [],
}

const taskStoreSlice = createSlice({
  name: 'taskStore',
  initialState: initialState,
  reducers: {
    GET_TASKS: (state, action: PayloadAction<TaskEntity[]>) => {
      state.tasks = action.payload
    },
    ADD_TASK: (state, action: PayloadAction<TaskEntity>) => {
      state.tasks.push(action.payload)
    },
    UPDATE_TASK: (state, action: PayloadAction<TaskEntity>) => {
      state.tasks = state.tasks.map(elem => (elem.id === action.payload.id ? action.payload : elem))
    },
    DELETE_TASK: (state, action: PayloadAction<TaskEntity>) => {
      state.tasks = state.tasks.filter((elem: TaskEntity) => elem.id !== action.payload.id)
    },
  },
})

export const ACTIONS = taskStoreSlice.actions

export default taskStoreSlice.reducer
