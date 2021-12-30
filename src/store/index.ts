import { configureStore } from '@reduxjs/toolkit';
import { taskApi } from './reducers/TaskApi';

const store = configureStore({
    reducer: {
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(taskApi.middleware),
});

export default store;
