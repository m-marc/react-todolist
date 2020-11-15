import React from "react";
import {FilterValuesType} from "./App";

export interface TaskPropsType {
    id: number
    title: string
    isDone: boolean
}

type TaskListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export function Todolist(props: TaskListPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        return <li><input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                props.removeTask(t.id)
                            }}>&#9747;</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={ () => props.changeFilter("all")}>All</button>
                <button onClick={ () => props.changeFilter("active")}>Active</button>
                <button onClick={ () => props.changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}