import React, {ChangeEvent, useCallback} from 'react'
import {TaskType} from "./AppWithRedux";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";

type TaskListPropType = {
    singleTask: TaskType,
    deleteTaskCallback: (_id: string, listId: string) => void,
    changeStatusCallback : (id: string, isDone: boolean, listId: string) => void,
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
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeStatusCallback(singleTask.id, e.currentTarget.checked, listId)
    const onChangeTitleHandler = useCallback((newValue: string) => changeTaskTitle(singleTask.id, newValue, listId),
        [changeTaskTitle, listId, singleTask.id])

    return (
        <div className={singleTask.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} color={"primary"} checked={singleTask.isDone}/>
            <EditableSpan title={singleTask.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})

export default SingleTask