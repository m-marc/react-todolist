import React, {ChangeEvent} from 'react'
import {TaskStatuses, TaskType} from "./api/todolist-api";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatus, changeTaskTitle, removeTask} from "./state/task/actions";

type SingleTaskPropsType = {
    taskId: string,
    listId: string
}

const SingleTaskRedux : React.FC<SingleTaskPropsType> = React.memo(({taskId, listId}) => {

    const storeTask = useSelector<AppRootStateType, TaskType>(state => state.tasks[listId].filter(t => t.id = taskId)[0])
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTask(listId, taskId))
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatus = e.currentTarget.checked
        dispatch(changeTaskStatus(listId, taskId, newStatus ? TaskStatuses.Completed : TaskStatuses.New))
    }
    const onChangeTitleHandler = (newTitle: string) => dispatch(changeTaskTitle(listId, taskId, newTitle))

    return (
        <div className={storeTask.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox onChange={onChangeStatusHandler} color={"primary"} checked={storeTask.status === TaskStatuses.Completed}/>
            <EditableSpan title={storeTask.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})

export default SingleTaskRedux