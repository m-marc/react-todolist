import axios from 'axios'

type TodolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}

type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}

type ResponseType<D> = {
    resultCode: number,
    messages: Array<string>,
    data: D
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export const todolistAPI = {
    createTodo(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists',{title})
    },
    getTodos() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    updateList(listId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${listId}`,{title})
    },
    deleteList(listId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${listId}`)
    }
}

export const taskAPI = {
    createTask(listId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${listId}/tasks`,{title})
    },
    getTasks(listId: string) {
        return instance.get<Array<TaskType>>(`todo-lists/${listId}/tasks`)
    },
    updateTask(listId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${listId}/tasks/${taskId}`,{title})
    },
    deleteTask(listId: string, taskId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${listId}/tasks/${taskId}`)
    }
}