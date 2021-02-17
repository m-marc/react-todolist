import React, {ChangeEvent, useCallback} from 'react'
import {TaskType} from "./api/todolist-api";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {TaskStatuses} from "./api/todolist-api";

export type TaskListPropType = {
    singleTask: TaskType,
    deleteTaskCallback: (_id: string, listId: string) => void,
    changeStatusCallback : (id: string, status: TaskStatuses, listId: string) => void,
    changeTaskTitle: (id: string, newValue: string, listId: string) => void,
    listId: string
}

const SingleTask : React.FC<TaskListPropType> = React.memo((props) => {
    const {
        singleTask,
        deleteTaskCallback,
        changeStatusCallback,
        changeTaskTitle,
        listId
    } = props
    const onClickHandler = () => deleteTaskCallback(singleTask.id, listId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked
        changeStatusCallback(singleTask.id, newStatus ? TaskStatuses.Completed : TaskStatuses.New, listId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => changeTaskTitle(singleTask.id, newValue, listId),
        [changeTaskTitle, listId, singleTask.id])

    return (
        <div className={singleTask.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} color={"primary"} checked={singleTask.status === TaskStatuses.Completed}/>
            <EditableSpan title={singleTask.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})

export default SingleTask