import TaskEntity from '../../entities/TaskEntity';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ModelMapper } from '../../utilities/MapperLibrary/MapperLibrary';
// import Config from '../../services/config/config';

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTaskList: builder.query<Array<TaskEntity>, void>({
            query: () => 'task',
            transformResponse: (response: Array<TaskEntity>) =>
                response.map((task: TaskEntity) =>
                    new ModelMapper(TaskEntity).map(task)
                ),
            providesTags: () => [{ type: 'Tasks', id: 'LIST' }],
        }),
        createTask: builder.mutation<TaskEntity, TaskEntity>({
            query: (task) => ({
                url: `task`,
                method: 'POST',
                body: task,
            }),
        }),
        updateTask: builder.mutation<TaskEntity, TaskEntity>({
            query: (task) => ({
                url: `task`,
                method: 'PUT',
                body: task,
            }),
            invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
        }),

        deleteTask: builder.mutation<void, string>({
            query: (id) => ({
                url: `task/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetTaskListQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
} = taskApi;
