import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import SingleTaskRedux from "./SingleTaskRedux";

type TaskListPropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter: (listId: string, value: FilterValuesType) => void
    addTaskCallback: (title: string, listId: string) => void
    changeListTitle: (id: string, newValue: string) => void
    filter: string,
    listId: string,
    removeListCallback: (id:string) => void,
}

const Todolist: React.FC<TaskListPropsType> = React.memo((props) => {
    const {
        tasks,
        changeListTitle,
        addTaskCallback,
        title,
        changeFilter,
        filter,
        listId,
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

    const mappedList = filteredTasks.map((t: TaskType)  =>
        <SingleTaskRedux taskId={t.id} listId={listId} key={t.id} />)

    const onAllClickHandler = useCallback(() => changeFilter(listId, "all"), [changeFilter, listId])
    const onActiveClickHandler = useCallback(() => changeFilter(listId,"active"), [changeFilter, listId])
    const onCompletedClickHandler = useCallback(() => changeFilter(listId,"completed"), [changeFilter, listId])
    const onClickRemoveHandler = () => removeListCallback(listId)
    const handleAdd = useCallback((itemTitle: string) => addTaskCallback(itemTitle, listId), [addTaskCallback, listId])
    const handleChangeTitle = (newTitle: string) => changeListTitle(listId, newTitle)

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