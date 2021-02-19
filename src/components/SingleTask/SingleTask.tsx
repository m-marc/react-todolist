import React, {ChangeEvent} from 'react'
import {TaskType} from "../../api/todolist-api";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {TaskStatuses} from "../../api/todolist-api";
import {useDispatch} from "react-redux";
import {thunkRemoveTask, thunkUpdateTask} from "../../state/task/thunks";
import {updateTask} from "../../state/task/actions";

export type TaskListPropType = {
    singleTask: TaskType,
    listId: string
}

const SingleTask : React.FC<TaskListPropType> = React.memo(({singleTask, listId}) => {
    const dispatch = useDispatch()
    const onClickDeleteTaskHandler = () => dispatch(thunkRemoveTask(listId, singleTask.id))
    const onChangeTitleHandler = (title: string) => dispatch(updateTask(listId, singleTask.id, {title}))
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let status: TaskStatuses = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(thunkUpdateTask(listId, singleTask.id, {status}))
    }

    return (
        <div className={singleTask.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} color={"primary"} checked={singleTask.status === TaskStatuses.Completed}/>
            <EditableSpan title={singleTask.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickDeleteTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})

export default SingleTask