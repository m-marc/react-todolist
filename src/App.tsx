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

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>(initData)
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const filteredTasks = changeFilter(tasks, filter);

    function removeTask(id: string) {
        return setTasks(tasks.filter(t => t.id !== id))
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={setFilter}
            />
        </div>
    );
}

export default App
