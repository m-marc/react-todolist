import {addTodolistAction, getTodolistAction, RemoveListAction} from "../todo-list/actions";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {RequestStatusType} from "../app/actions";

export type setTaskAction = ReturnType<typeof setTask>
export const setTask = (tasks: TaskType[], listId: string) =>
    ({type: 'Task/get_tasks', tasks, listId} as const)

export type removeTaskAction = ReturnType<typeof removeTask>
export const removeTask = (listId:string, taskId: string) =>
    ({type: 'Task/remove_task', listId, taskId} as const)

export type addTaskAction = ReturnType<typeof addTask>
export const addTask =  (task: TaskType) =>
    ({type: 'Task/add_task', task} as const)

export type changeTaskTitleAction = ReturnType<typeof changeTaskTitle>
export const changeTaskTitle = (listId: string, taskId: string, title: string) =>
    ({type: 'Task/change_title', listId, taskId, title} as const)

export type changeTaskStatusAction = ReturnType<typeof changeTaskStatus>
export const changeTaskStatus = (listId: string, taskId: string, status: TaskStatuses) =>
    ({type: 'Task/change_status', listId, taskId, status} as const)

export type changeTaskEntityStatusAction = ReturnType<typeof changeTaskEntityStatus>
export const changeTaskEntityStatus = (listId: string, taskId: string, entityStatus: RequestStatusType) =>
    ({type: 'Task/change_entity_status', listId, taskId, entityStatus} as const)

export type TasksActionTypes = getTodolistAction
    | setTaskAction
    | removeTaskAction
    | addTaskAction
    | changeTaskTitleAction
    | changeTaskStatusAction
    | addTodolistAction
    | RemoveListAction
    | changeTaskEntityStatusAction