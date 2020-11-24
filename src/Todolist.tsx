import React, {ChangeEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type TaskListPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTaskCallback: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTaskCallback: (title: string) => void
}

export function Todolist(props: TaskListPropsType) {

    const mappedList = props.tasks.map(t => {
        const onClickHandler = () => props.deleteTaskCallback(t.id)
        return <li key={t.id}><input type="checkbox" defaultChecked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onClickHandler}>&#9747;</button>
        </li>
    })

    const [title, setTitle] = useState("")

    const addCallback = () => {
        props.addTaskCallback(title)
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addCallback()
    }

    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={addCallback}>+</button>
            </div>
            <ul>
                {mappedList}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}