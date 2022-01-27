import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import classes from './ListTasksContainer.module.scss'
import TaskCard from '../../components/ui/TaskCard/TaskCard'
import AlertService from '../../services/alert/AlertService'
import {
  useDeleteTaskMutation,
  useGetTaskListQuery,
  useUpdateTaskMutation,
} from '../../store/reducers/TaskApi'
import { useEffect } from 'react'
import { TaskType } from '../../types/TaskType'

const ListTasksContainer = () => {
  const { data = [] } = useGetTaskListQuery()
  const [updateTask, updateTaskRequest] = useUpdateTaskMutation()
  const [deleteTask, deleteTaskRequest] = useDeleteTaskMutation()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (deleteTaskRequest.isSuccess) {
      AlertService.success({ text: 'Task deleted with success!' })
      deleteTaskRequest.reset()
    }

    if (deleteTaskRequest.isError) {
      AlertService.error({ text: 'Something went wrong...' })
      deleteTaskRequest.reset()
    }

    if (updateTaskRequest.isError) {
      AlertService.error({ text: 'Something went wrong...' })
      updateTaskRequest.reset()
    }
  }, [deleteTaskRequest, updateTaskRequest])

  const onEditStatusHandler = (task: TaskType) => {
    updateTask({ ...task, completed: !task.completed })
  }

  const onDeleteHandler = async (task: TaskType) => {
    if (!task.id) return

    const check = await AlertService.confirm({
      text: 'Do you wanna delete the task?',
    })

    if (!check) return

    deleteTask(task.id)
  }

  const filter = searchParams[0].get('filter') || 'all'

  const tasks = data
    .filter(task => {
      switch (filter.toLowerCase()) {
        case 'todo':
          return !task.completed
        case 'completed':
          return task.completed
      }
      return true
    })
    .sort((a: TaskType, b: TaskType) => {
      return (b.created_date || 0) - (a.created_date || 0)
    })

  return (
    <div className={`${classes.ListTasksContainer} row`}>
      <div className="col-12 mb-4">
        <h3 className="mb-3">Filter</h3>
        <div className="btn-group col-12" role="group" aria-label="Basic outlined example">
          <Link
            className={`btn btn-outline-primary ${filter === 'all' ? 'active' : ''}`}
            to={'?filter=all'}
          >
            All
          </Link>
          <Link
            className={`btn btn-outline-primary ${filter === 'todo' ? 'active' : ''}`}
            to={'?filter=todo'}
          >
            TODO
          </Link>
          <Link
            className={`btn btn-outline-primary ${filter === 'completed' ? 'active' : ''}`}
            to={'?filter=completed'}
          >
            Completed
          </Link>
        </div>
        <hr />
      </div>

      <div className="col-12">
        <ul>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <li className="mb-3" key={task.id}>
                <TaskCard
                  onDelete={onDeleteHandler}
                  onEditStatus={onEditStatusHandler}
                  task={task}
                />
              </li>
            ))
          ) : (
            <h2 className="text-center p-5">No tasks</h2>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ListTasksContainer
