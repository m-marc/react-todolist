import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import SingleTask from "./SingleTask";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TaskListPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTaskCallback: (id: string, listId: string) => void
    changeFilter: (listId: string, value: FilterValuesType) => void
    addTaskCallback: (title: string, listId: string) => void
    changeStatusCallback : (id: string, isDone: boolean, listId: string) => void
    changeTaskTitle: (id: string, newValue: string, listId: string) => void
    changeListTitle: (id: string, newValue: string) => void
    filter: string,
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

    let filteredTasks = tasks;

    if (filter === "completed") filteredTasks = tasks.filter(t => t.isDone)
    else if (filter === "active") filteredTasks = tasks.filter(t => !t.isDone)

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
    const handleAdd = useCallback((itemTitle: string) => addTaskCallback(itemTitle, id), [addTaskCallback, id])
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