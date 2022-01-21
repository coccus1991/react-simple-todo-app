import TaskCard from './TaskCard'
import TaskEntity from '../../../entities/TaskEntity'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'

test('<TaskCard /> test labels', async () => {
  const newTask = new TaskEntity()
  newTask.name = 'Task mock'
  newTask.description = 'Task description'
  const component = render(<TaskCard task={newTask} />)

  expect(component.getByTestId('title-label').textContent).toBe('Task mock')
  expect(component.getByTestId('description-label').textContent).toBe('Task description')
})

test('<TaskCard /> test callback props', () => {
  const newTask = new TaskEntity()
  newTask.name = 'Task mock'
  newTask.description = 'Task description'

  let deleteCallback = null
  let editStatusCallback = null

  const component = render(
    <TaskCard
      task={newTask}
      onDelete={task => (deleteCallback = task)}
      onEditStatus={task => (editStatusCallback = task)}
    />,
  )

  fireEvent.click(component.getByTestId('delete-button'))
  fireEvent.click(component.getByTestId('edit-status-button'))

  expect(deleteCallback).toBe(newTask)
  expect(editStatusCallback).toBe(newTask)
})
