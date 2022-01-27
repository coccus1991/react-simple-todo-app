import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { TaskType } from '../../types/TaskType'
import Config from '../../services/config/config'

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await Config.getInstance().loadConfig()
  return fetchBaseQuery({
    baseUrl: Config.getInstance().getProperty('api.baseUrl', ''),
  })(args, api, extraOptions)
}

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery,
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    getTaskList: builder.query<TaskType[], void>({
      query: () => 'task',
      providesTags: (tasks = []) => [
        ...tasks.map(({ id }) => ({ type: 'Tasks' as const, id: id })),
        { type: 'Tasks', id: 'LIST' },
      ],
    }),
    createTask: builder.mutation<TaskType, TaskType>({
      query: task => ({
        url: `task`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: () => [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateTask: builder.mutation<TaskType, TaskType>({
      query: task => ({
        url: `task`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: task => [{ type: 'Tasks', id: task?.id }],
    }),

    deleteTask: builder.mutation<void, string>({
      query: id => ({
        url: `task/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTaskListQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi
