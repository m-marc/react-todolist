import React, {ChangeEvent, useCallback} from 'react'
import {TaskType} from "./App";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";

type SingleTaskPropsType = {
    taskId: string,
    listId: string
}

const SingleTaskRedux : React.FC<SingleTaskPropsType> = React.memo(({taskId, listId}) => {

    const storeTask = useSelector<AppRootStateType, TaskType>(state => state.tasks[listId].filter(t => t.id = taskId)[0])
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(taskId, listId))
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked
        dispatch(changeTaskStatusAC(taskId, newStatus, listId))
    }
    const onChangeTitleHandler = (newTitle: string) => dispatch(changeTaskTitleAC(taskId, newTitle, listId))

    return (
        <div className={storeTask.isDone ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} color={"primary"} checked={storeTask.isDone}/>
            <EditableSpan title={storeTask.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})

export default SingleTaskRedux