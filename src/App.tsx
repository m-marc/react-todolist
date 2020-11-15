import React, {useState} from 'react'
import './App.css'
import {TaskPropsType, Todolist} from "./Todolist"

export type FilterValuesType = "all" | "completed" | "active"

function App() {
    const initData = [
        {id: 0, title: "HTML&CSS", isDone: true},
        {id: 1, title: "Vanilla JS", isDone: true},
        {id: 2, title: "React", isDone: false},
        {id: 3, title: "Redux", isDone: false},
    ]
    const [tasks, setTasks] = useState<Array<TaskPropsType>>(initData)
    const [filter, setFilter] = useState<FilterValuesType>("all")
    let filtredTasks = tasks

    function removeTask(id: number) {
        return setTasks(tasks.filter(t => t.id !== id))
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    if (filter === "completed") {
        filtredTasks = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        filtredTasks = tasks.filter(t => !t.isDone)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filtredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App
