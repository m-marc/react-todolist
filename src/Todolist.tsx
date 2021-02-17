import React, {useCallback, useEffect} from "react";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import SingleTask from "./SingleTask";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {thunkSetTask} from "./state/task/thunks";
import {FilterValuesType} from "./state/todo-list/reducers";

type TaskListPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTaskCallback: (id: string, listId: string) => void
    changeFilter: (listId: string, value: FilterValuesType) => void
    addTaskCallback: (title: string, listId: string) => void
    changeStatusCallback : (id: string, status: TaskStatuses, listId: string) => void
    changeTaskTitle: (id: string, newValue: string, listId: string) => void
    changeListTitle: (id: string, newValue: string) => void
    filter?: string,
    id: string,
    removeListCallback: (id:string) => void,
}

const Todolist: React.FC<TaskListPropsType> = React.memo((props) => {
    const {
        tasks,
        deleteTaskCallback,
        changeStatusCallback,
        changeTaskTitle,
        changeListTitle,
        addTaskCallback,
        title,
        changeFilter,
        filter,
        id,
        removeListCallback
    } = props

    const flexWrap = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkSetTask(id))
    }, [dispatch, id])

    let filteredTasks = tasks;

    if (filter === "completed") filteredTasks = tasks.filter(t => t.status ===  TaskStatuses.Completed)
    else if (filter === "active") filteredTasks = tasks.filter(t => t.status === TaskStatuses.New)

    const mappedList = filteredTasks.map((t: TaskType)  => (
        <SingleTask
            key={t.id}
            listId={id}
            singleTask={t}
            deleteTaskCallback={deleteTaskCallback}
            changeStatusCallback={changeStatusCallback}
            changeTaskTitle={changeTaskTitle}
        />
    ))

    const onAllClickHandler = useCallback(() => changeFilter(id, "all"), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter(id,"active"), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter(id,"completed"), [changeFilter, id])
    const onClickRemoveHandler = () => removeListCallback(id)
    const handleAdd = useCallback((itemTitle: string) => addTaskCallback(id, itemTitle), [addTaskCallback, id])
    const handleChangeTitle = (newTitle: string) => changeListTitle(id, newTitle)

    return (
        <div>
            <div style={flexWrap}>
                <h3>
                    <EditableSpan title={title} onChange={handleChangeTitle}/>
                </h3>
                <IconButton onClick={onClickRemoveHandler}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={handleAdd}/>
            <ul>
                {mappedList}
            </ul>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button variant={filter === "all" ? "outlined" : "text"} color={"default"} onClick={onAllClickHandler}>All</Button>
                <Button variant={filter === "active" ? "outlined" : "text"} color={"primary"} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={filter === "completed" ? "outlined" : "text"} color={"secondary"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})

export default Todolist