import React, {ChangeEvent} from 'react'
import {TaskType} from "./App";

type TaskListPropType = { // need to fix any
    data: TaskType,
    deleteTaskCallback: (_id: string, listId: string) => void,
    changeStatusCallback : (id: string, isDone: boolean, listId: string) => void,
    listId: string
}

const SingleTask : React.FC<TaskListPropType> = ({data, deleteTaskCallback, changeStatusCallback, listId}) => {
    const onClickHandler = () => deleteTaskCallback(data.id, listId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeStatusCallback(data.id, e.currentTarget.checked, listId)
    return (
        <div className={data.isDone ? "is-done" : ""}>
            <input onChange={onChangeHandler} type="checkbox" checked={data.isDone}/>
            <span>{data.title}</span>
            <button onClick={onClickHandler}>&#9747;</button>
        </div>
    )
}

export default SingleTask