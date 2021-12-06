import {bindActionCreators} from "@reduxjs/toolkit";
import store from "../index";
import TaskRepository from "../../repositories/TaskRepository";
import TaskEntity from "../../entities/TaskEntity";
import {ACTIONS} from "../reducers/TaskStore";

let taskActions = {} as any;
const taskRepository: TaskRepository = new TaskRepository();

/**
 * @throws HttpError
 */
taskActions.getTasks = () => async (dispatch, getState) => {
    try {
        let tasks = await taskRepository.getTasks();

        dispatch(ACTIONS.GET_TASKS(tasks));
    } catch (e) {
        console.log("Something went wrong", e.message);
        throw e;
    }
};

/**
 * @throws HttpError
 * @param task
 */
taskActions.addTask = (task: TaskEntity) => async (dispatch, getState) => {
    try {
        let newTask = await taskRepository.addTask(task);

        dispatch(ACTIONS.ADD_TASK(newTask));
    } catch (e) {
        console.log("Something went wrong", e.message);
        throw e;
    }
};

/**
 * @throws HttpError
 * @param task
 */
taskActions.updateTask = (task: TaskEntity) => async (dispatch, getState) => {
    try {
        let newTask = await taskRepository.updateTask(task);

        dispatch(ACTIONS.UPDATE_TASK(newTask));
    } catch (e) {
        console.log("Something went wrong", e.message);
        throw e;
    }
};

/**
 * @throws HttpError
 * @param task
 */
taskActions.deleteTask = (task: TaskEntity) => async (dispatch, getState) => {
    try {
        await taskRepository.deleteTask(task);

        dispatch(ACTIONS.DELETE_TASK(task));
    } catch (e) {
        console.log("Something went wrong", e.message);
        throw e;
    }
};

export const TaskActions = bindActionCreators(taskActions, store.dispatch);
