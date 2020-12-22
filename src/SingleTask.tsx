import React, {ChangeEvent} from 'react'
import {TaskType} from "./App";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";

type TaskListPropType = {
    data: TaskType,
    deleteTaskCallback: (_id: string, listId: string) => void,
    changeStatusCallback : (id: string, isDone: boolean, listId: string) => void,
    changeTaskTitle: (id: string, newValue: string, listId: string) => void,
    listId: string
}

const SingleTask : React.FC<TaskListPropType> = ({data, deleteTaskCallback, changeStatusCallback, changeTaskTitle, listId}) => {
    const onClickHandler = () => deleteTaskCallback(data.id, listId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeStatusCallback(data.id, e.currentTarget.checked, listId)
    const onChangeTitleHandler = (newValue: string) => changeTaskTitle(data.id, newValue, listId)

    return (
        <div className={data.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} color={"primary"} checked={data.isDone}/>
            <EditableSpan title={data.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
}

export default SingleTask