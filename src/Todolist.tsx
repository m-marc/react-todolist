import React from "react";
import {FilterValuesType, TaskType} from "./App";

type TaskListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: TaskListPropsType) {
    const mappedList = props.tasks.map(t => {
        return <li key={t.id}><input type="checkbox" defaultChecked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => props.removeTask(t.id)}>&#9747;</button>
        </li>
    })
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {mappedList}
            </ul>
            <div>
                <button onClick={ () => props.changeFilter("all")}>All</button>
                <button onClick={ () => props.changeFilter("active")}>Active</button>
                <button onClick={ () => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}