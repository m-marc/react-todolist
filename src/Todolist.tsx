import React, {ChangeEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";
import SingleTask from "./SingleTask";
import AddItemForm from "./AddItemForm";

type TaskListPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTaskCallback: (id: string, listId: string) => void
    changeFilter: (listId: string, value: FilterValuesType) => void
    addTaskCallback: (title: string, listId: string) => void
    changeStatusCallback : (id: string, isDone: boolean, listId: string) => void
    filter: string,
    id: string,
    removeListCallback: (id:string) => void,
}

const Todolist: React.FC<TaskListPropsType> = ({tasks, deleteTaskCallback, changeStatusCallback, addTaskCallback, title, changeFilter, filter, id, removeListCallback}) => {
    const s = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

    const mappedList = tasks.map((t: TaskType)  => (
        <SingleTask
            key={t.id}
            listId={id}
            data={t}
            deleteTaskCallback={deleteTaskCallback}
            changeStatusCallback={changeStatusCallback} />
    ))

    const onAllClickHandler = (e: React.MouseEvent<HTMLElement>) => changeFilter(id, "all")
    const onActiveClickHandler = (e: React.MouseEvent<HTMLElement>) => changeFilter(id,"active")
    const onCompletedClickHandler = (e: React.MouseEvent<HTMLElement>) => changeFilter(id,"completed")
    const onClickRemoveHandler = (e: React.MouseEvent<HTMLElement>) => removeListCallback(id)

    const handleAdd = (itemTitle: string) => addTaskCallback(itemTitle, id)

    return (
        <div>
            <div style={s}>
                <h3>{title}</h3>
                <button onClick={onClickRemoveHandler}>&#9747;</button>
            </div>
            <AddItemForm addItem={handleAdd}/>
            <ul>
                {mappedList}
            </ul>
            <div>
                <button className={filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist