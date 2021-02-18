import {Dispatch} from "redux";
import {taskAPI, TaskStatuses} from "../../api/todolist-api";
import {addTask, changeTaskStatus, changeTaskTitle, removeTask, setTask} from "./actions";
import {AppRootStateType} from "../store";
import {setAppStatus} from "../app/actions";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export const thunkSetTask = (listId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    taskAPI.getTasks(listId)
        .then(res => {
            dispatch(setTask(res.data.items, listId))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const thunkAddTask = (listId: string, taskTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    taskAPI.createTask(listId, taskTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTask(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            }
            else handleServerAppError(res.data, dispatch)
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const thunkUpdateTaskStatus = (listId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatus('loading'))
        const task = getState().tasks[listId].find(t => t.id === taskId)
        task && taskAPI.updateTask(listId, taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        })
            .then(() => {
                dispatch(changeTaskStatus(listId, taskId, status))
                dispatch(setAppStatus('succeeded'))
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }

export const thunkRemoveTask = (listId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    taskAPI.deleteTask(listId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTask(listId, taskId))
                dispatch(setAppStatus('succeeded'))
            }
            else handleServerAppError(res.data, dispatch)
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const thunkUpdateTaskTitle = (listId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatus('loading'))
        const task = getState().tasks[listId].find(t => t.id === taskId)
        debugger
        task && taskAPI.updateTask(listId, taskId, {
            title: title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status
        })
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTaskTitle(listId, taskId, title))
                    dispatch(setAppStatus('succeeded'))
                }
                else handleServerAppError(res.data, dispatch)
            })
            .catch(error => handleServerNetworkError(error, dispatch))
    }
