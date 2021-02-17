import {Dispatch} from "redux";
import {taskAPI, TaskStatuses} from "../../api/todolist-api";
import {addTask, changeTaskStatus, changeTaskTitle, removeTask, setTask} from "./actions";
import {AppRootStateType} from "../store";

export const thunkSetTask = (listId: string) => (dispatch: Dispatch) =>
    taskAPI.getTasks(listId)
        .then(res => dispatch(setTask(res.data.items, listId)))

export const thunkAddTask = (listId: string, taskTitle: string) => (dispatch: Dispatch) =>
    taskAPI.createTask(listId, taskTitle)
        .then(res => dispatch(addTask(res.data.data.item)))

export const thunkUpdateTaskStatus = (listId: string, taskId: string, status: TaskStatuses) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[listId].find(t => t.id === taskId)
        debugger
        task && taskAPI.updateTask(listId, taskId, {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: status
        })
            .then(() => dispatch(changeTaskStatus(listId, taskId, status)))
    }

export const thunkRemoveTask = (listId: string, taskId: string) => (dispatch: Dispatch) =>
    taskAPI.deleteTask(listId, taskId)
        .then( res => dispatch(removeTask(listId, taskId)))

export const thunkUpdateTaskTitle = (listId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
            .then(() => dispatch(changeTaskTitle(listId, taskId, title)))
    }
