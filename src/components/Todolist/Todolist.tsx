import React, {useEffect} from "react";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import SingleTask from "../SingleTask/SingleTask";
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {IconButton, Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {thunkAddTask, thunkSetTask} from "../../state/task/thunks";
import {FilterValuesType, TodolistDomainType} from "../../state/todo-list/reducers";
import {thunkChangeTodolistTitle, thunkRemoveTodolist} from "../../state/todo-list/thunks";
import {changeTodolistFilter} from "../../state/todo-list/actions";
import {AppRootStateType} from "../../state/store";
import {TaskStateType} from "../../state/task/reducers";

type TaskListPropsType = {
    list: TodolistDomainType
}

const Todolist: React.FC<TaskListPropsType> = React.memo(({list}) => {
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkSetTask(list.id))
    }, [dispatch, list.id])

    let filteredTasks = tasks[list.id];

    if (list.filter === "completed") filteredTasks = tasks[list.id].filter(t => t.status ===  TaskStatuses.Completed)
    else if (list.filter === "active") filteredTasks = tasks[list.id].filter(t => t.status === TaskStatuses.New)

    const onClickChangeFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.dataset.filter) {
            //@ts-ignore
            const filter: FilterValuesType = e.currentTarget.dataset.filter
            dispatch(changeTodolistFilter(list.id, filter))
        }
    }
    const onClickRemoveHandler = () => dispatch(thunkRemoveTodolist(list.id))
    const handleAdd = (taskTitle: string) => dispatch(thunkAddTask(list.id, taskTitle))
    const handleChangeTitle = (listTitle: string) => dispatch(thunkChangeTodolistTitle(list.id, listTitle))

    const flexWrap = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
    return (
        <div>
            <div style={flexWrap}>
                <h3><EditableSpan title={list.title} onChange={handleChangeTitle}/></h3>
                <IconButton onClick={onClickRemoveHandler}><Delete/></IconButton>
            </div>
            <AddItemForm addItem={handleAdd}/>
            <ul>
                {filteredTasks.map((t: TaskType)  => (
                    <SingleTask
                        key={t.id}
                        listId={list.id}
                        singleTask={t}
                    />
                ))}
            </ul>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button variant={list.filter === "all" ? "outlined" : "text"} color={"default"} data-filter="all" onClick={onClickChangeFilter}>All</Button>
                <Button variant={list.filter === "active" ? "outlined" : "text"} color={"primary"} data-filter="active" onClick={onClickChangeFilter}>Active</Button>
                <Button variant={list.filter === "completed" ? "outlined" : "text"} color={"secondary"} data-filter="completed" onClick={onClickChangeFilter}>Completed</Button>
            </div>
        </div>
    )
})

export default Todolist