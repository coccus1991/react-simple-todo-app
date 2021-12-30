import { configureStore } from '@reduxjs/toolkit';
import TaskStore from './reducers/TaskStore';
import { taskApi } from './reducers/TaskApi';

const store = configureStore({
    reducer: {
        taskStore: TaskStore,
        [taskApi.reducerPath]: taskApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(taskApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
