import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import store from '../index';
import TaskRepository from '../../repositories/TaskRepository';
import TaskEntity from '../../entities/TaskEntity';
import { ACTIONS } from '../reducers/TaskStore';

const taskRepository: TaskRepository = new TaskRepository();

const taskActions = {
    getTasks: () => async (dispatch: Dispatch) => {
        try {
            const tasks = await taskRepository.getTasks();

            dispatch(ACTIONS.GET_TASKS(tasks));
        } catch (e) {
            throw e;
        }
    },

    addTask: (task: TaskEntity) => async (dispatch: Dispatch) => {
        try {
            const newTask = await taskRepository.addTask(task);

            dispatch(ACTIONS.ADD_TASK(newTask));
        } catch (e) {
            throw e;
        }
    },

    updateTask: (task: TaskEntity) => async (dispatch: Dispatch) => {
        try {
            const newTask = await taskRepository.updateTask(task);

            dispatch(ACTIONS.UPDATE_TASK(newTask));
        } catch (e) {
            throw e;
        }
    },

    deleteTask: (task: TaskEntity) => async (dispatch: Dispatch) => {
        try {
            await taskRepository.deleteTask(task);

            dispatch(ACTIONS.DELETE_TASK(task));
        } catch (e: unknown) {
            throw e;
        }
    },
};

export const TaskActions = bindActionCreators(taskActions, store.dispatch);
