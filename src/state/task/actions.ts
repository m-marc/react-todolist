import {addTodolistAction, getTodolistAction, RemoveListAction} from "../todo-list/actions";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

export enum TASK_ACTION_TYPES {
    SET_TASKS = 'SET_TASKS',
    REMOVE_TASK = 'REMOVE_TASK',
    ADD_TASK = 'ADD_TASK',
    CHANGE_STATUS = 'CHANGE_TASK_STATUS',
    CHANGE_TITLE = 'CHANGE_TASK_TITLE'
}
export type setTaskAction = ReturnType<typeof setTask>
export const setTask = (tasks: TaskType[], listId: string) =>
    ({type: TASK_ACTION_TYPES.SET_TASKS, tasks, listId} as const)

export type removeTaskAction = ReturnType<typeof removeTask>
export const removeTask = (listId:string, taskId: string) =>
    ({type: TASK_ACTION_TYPES.REMOVE_TASK, listId, taskId} as const)

export type addTaskAction = ReturnType<typeof addTask>
export const addTask =  (task: TaskType) =>
    ({type: TASK_ACTION_TYPES.ADD_TASK, task} as const)

export type changeTaskTitleAction = ReturnType<typeof changeTaskTitle>
export const changeTaskTitle = (listId: string, taskId: string, title: string) =>
    ({type: TASK_ACTION_TYPES.CHANGE_TITLE, listId, taskId, title} as const)

export type changeTaskStatusAction = ReturnType<typeof changeTaskStatus>
export const changeTaskStatus = (listId: string, taskId: string, status: TaskStatuses) =>
    ({type: TASK_ACTION_TYPES.CHANGE_STATUS, listId, taskId, status} as const)

export type TasksActionTypes = getTodolistAction
    | setTaskAction
    | removeTaskAction
    | addTaskAction
    | changeTaskTitleAction
    | changeTaskStatusAction
    | addTodolistAction
    | RemoveListAction