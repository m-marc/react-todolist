import {TaskStateType, TodolistType} from "../App"
import {v1} from "uuid";
import {addListActionType, removeListActionType} from "./todolist-reducer";

type ActionType = AddTaskActionType | RemoveTaskActionType | changeTaskStatusActionType | changeTaskTitleActionType | addListActionType | removeListActionType


export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type changeTaskStatusActionType = {
    type: 'CHANGE-STATUS',
    status: boolean,
    todolistId: string,
    taskId: string
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TITLE',
    title: string,
    todolistId: string,
    taskId: string
}

export const taskReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newState = {...state}
            newState[action.todolistId] = newState[action.todolistId].filter(t => t.id !== action.taskId)
            return newState
        }
        case 'ADD-TASK': {
            let newState = {...state}
            let newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            newState[action.todolistId] = [newTask, ...state[action.todolistId]]
            return newState
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if (t.id !== action.taskId) return t
                    else return {...t, isDone: action.status}
                })
            }
        }
        case 'CHANGE-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => {
                    if (t.id !== action.taskId) return t
                    else return {...t, title: action.title}
                })
            }
        }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST': {
            let newState = {...state}
            delete newState[action.todolistId]
            return newState
        }
        default:
            throw new Error("Invalid type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, status: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: "CHANGE-STATUS", taskId, status, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleActionType => {
    return {type: "CHANGE-TITLE", taskId, title, todolistId}
}
