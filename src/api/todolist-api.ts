import axios from 'axios'
import {Api} from "./api-key";

export type TodolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}

export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}
type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type ResponseType<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
type AuthLoginType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': Api.KEY
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export const todolistAPI = {
    createTodo(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists',{title})
            .then(res => res.data)
    },
    getTodos() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    updateList(listId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${listId}`,{title})
    },
    deleteList(listId: string) {
        return instance.delete<ResponseType>(`todo-lists/${listId}`)
    }
}

export const taskAPI = {
    createTask(listId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${listId}/tasks`,{title})
    },
    getTasks(listId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${listId}/tasks`)
    },
    updateTask(listId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${listId}/tasks/${taskId}`,model)
    },
    deleteTask(listId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${listId}/tasks/${taskId}`)
    }
}

export const authAPI = {
    login(data: AuthLoginType) {
        return instance.post<ResponseType<{userId: number}>>(`auth/login`, data).then(r => r.data)
    }
}