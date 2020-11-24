import React, {useState} from 'react'
import './App.css'
import {Todolist} from "./Todolist"
import {v1} from "uuid";

export interface TaskType {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active"

export const initData = [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "Vanilla JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
]

export const changeFilter = (taskList: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
    if (filter === "completed") return taskList.filter(t => t.isDone)
    else if (filter === "active") return taskList.filter(t => !t.isDone)
    else return taskList
}

export const deleteTask = (taskList: Array<TaskType>, id: string): Array<TaskType> => {
    return taskList.filter(t => t.id !== id)
}

export const addTask = (taskList: Array<TaskType>, title: string): Array<TaskType> => {
    const newTask = {
        id: v1(),
        title: title,
        isDone: false
    }
    return [newTask, ...taskList]
}

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>(initData)
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const filteredTasks = changeFilter(tasks, filter);
    const deleteTaskCallback = (id: string) => setTasks(deleteTask(tasks, id))


    const addTaskCallback = (title:string) => setTasks(addTask(tasks,title))


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      deleteTaskCallback={deleteTaskCallback}
                      changeFilter={setFilter}
                      addTaskCallback={addTaskCallback}
            />
        </div>
    );
}

export default App
