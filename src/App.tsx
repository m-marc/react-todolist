import React, {useState} from 'react'
import './App.css'
import {v1} from "uuid";
import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";

export interface TaskType {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [key:string] : Array<TaskType>
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type FilterValuesType = "all" | "completed" | "active"

const listId1 = v1()
const listId2 = v1()

const initData: TaskStateType = {
    [listId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "Vanilla JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ],
    [listId2]: [
        {id: v1(), title: "PS4", isDone: true},
        {id: v1(), title: "TV", isDone: true},
        {id: v1(), title: "PS5", isDone: false},
        {id: v1(), title: "Cyberpunk 2077", isDone: false},
    ]
}

const initTodolist: Array<TodolistType> = [
    {
        id: listId1,
        title: "What to learn",
        filter: "all",
    },
    {
        id: listId2,
        title: "What to buy",
        filter: "active",
    }
]

export const changeStatus = (taskList: TaskStateType, id: string, status: boolean, listId: string) => {
    const selectedTask = taskList[listId].find(t => t.id === id)
    if (selectedTask) selectedTask.isDone = status
    return {...taskList}
}

export const deleteTask = (taskList: TaskStateType,listId: string, id: string): TaskStateType => {
    taskList[listId] = taskList[listId].filter(t => t.id !== id)
    return {...taskList}
}

export const addTask = (taskList: TaskStateType, title: string, listId: string): TaskStateType => {
    const newTask = {
        id: v1(),
        title: title,
        isDone: false
    }
    taskList[listId] = [newTask, ...taskList[listId]]
    return {...taskList}
}

function App() {
    const [tasks, setTasks] = useState<TaskStateType>(initData)
    const [todoList, setTodoList] = useState<Array<TodolistType>>(initTodolist)
    const deleteTaskCallback = (id: string, listId: string) => setTasks(deleteTask(tasks,listId, id))
    const addTaskCallback = (title: string, listId: string) => setTasks(addTask(tasks, title, listId))
    const changeStatusCallback = (id: string, status: boolean, listId: string) => setTasks(changeStatus(tasks, id, status, listId))

    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
        let selectedList = todoList.find(tl => tl.id === todoListID)
        if (selectedList) {
            selectedList.filter = filter
            setTodoList([...todoList])
        }
    }

    const removeList = (id: string) => {
        setTodoList(todoList.filter(tl => tl.id != id))
        delete tasks[id]
        setTasks({...tasks})
    }

    const addList = (title: string) => {
        let newList: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title
        }
        setTodoList([newList, ...todoList])
        setTasks({
            ...tasks,
            [newList.id]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addList} />
            {
                todoList.map(tl => {
                    let filteredTasks = tasks[tl.id]
                    if (tl.filter === "completed") filteredTasks = tasks[tl.id].filter(t => t.isDone)
                    else if (tl.filter === "active") filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        deleteTaskCallback={deleteTaskCallback}
                        changeFilter={changeFilter}
                        addTaskCallback={addTaskCallback}
                        changeStatusCallback={changeStatusCallback}
                        filter={tl.filter}
                        removeListCallback={removeList} />
                })
            }

        </div>
    );
}

export default App
