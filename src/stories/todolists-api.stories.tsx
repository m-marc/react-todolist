import React, {useEffect, useState} from 'react'
import {todolistAPI, taskAPI} from "../api/todolist-api";
export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodo("newTodolist")
            .then( (res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listId = ''
        todolistAPI.deleteList(listId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listId = ''
        todolistAPI.updateList(listId, "New title")
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listId = 'cce8d4f0-fe89-4e0c-97f6-c82b21c4a83a'
        taskAPI.getTasks(listId)
            .then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listId = ''
        taskAPI.createTask(listId, "New Task")
            .then( (res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listId = ''
        const taskId = ''
        taskAPI.deleteTask(listId, taskId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const listId = ''
        const taskId = ''
        taskAPI.updateTask(listId, taskId,"Updated title>>>")
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
