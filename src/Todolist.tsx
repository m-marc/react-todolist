import React from "react";
import {FilterValuesType, TaskType} from "./App";
import SingleTask from "./SingleTask";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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

const Todolist: React.FC<TaskListPropsType> = ({tasks, deleteTaskCallback, changeStatusCallback, changeTaskTitle, changeListTitle, addTaskCallback, title, changeFilter, filter, id, removeListCallback}) => {
    const s = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }

    const mappedList = tasks.map((t: TaskType)  => (
        <SingleTask
            key={t.id}
            listId={id}
            data={t}
            deleteTaskCallback={deleteTaskCallback}
            changeStatusCallback={changeStatusCallback}
            changeTaskTitle={changeTaskTitle}
        />
    ))

    const onAllClickHandler = () => changeFilter(id, "all")
    const onActiveClickHandler = () => changeFilter(id,"active")
    const onCompletedClickHandler = () => changeFilter(id,"completed")
    const onClickRemoveHandler = () => removeListCallback(id)
    const handleAdd = (itemTitle: string) => addTaskCallback(itemTitle, id)
    const handleChangeTitle = (newTitle: string) => changeListTitle(id, newTitle)

    return (
        <div>
            <div style={s}>
                <h3>
                    <EditableSpan title={title} onChange={handleChangeTitle}/>
                </h3>
                <button onClick={onClickRemoveHandler}>&#9747;</button>
            </div>
            <AddItemForm addItem={handleAdd}/>
            <ul>
                {mappedList}
            </ul>
            <div>
                <button className={filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist