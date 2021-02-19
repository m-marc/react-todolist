import {addTodolistAction, getTodolistAction, RemoveListAction} from "../todo-list/actions";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolist-api";
import {RequestStatusType} from "../app/actions";
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksActionTypes = ReturnType<typeof setTask>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof updateTask>
    | getTodolistAction
    | addTodolistAction
    | RemoveListAction
    | changeTaskEntityStatusAction


export const setTask = (tasks: TaskType[], listId: string) => ({type: 'Task/get_tasks', tasks, listId} as const)
export const removeTask = (listId:string, taskId: string) => ({type: 'Task/remove_task', listId, taskId} as const)
export const addTask =  (task: TaskType) => ({type: 'Task/add_task', task} as const)
export const updateTask = (listId: string, taskId: string, model: UpdateDomainTaskModelType) =>
    ({type: 'Task/update_task', listId, taskId, model} as const)

export type changeTaskEntityStatusAction = ReturnType<typeof changeTaskEntityStatus>
export const changeTaskEntityStatus = (listId: string, taskId: string, entityStatus: RequestStatusType) =>
    ({type: 'Task/change_entity_status', listId, taskId, entityStatus} as const)