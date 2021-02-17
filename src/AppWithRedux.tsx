import React, {useCallback, useEffect} from 'react'
import './App.css'
import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {
    thunkAddTodolist,
    thunkChangeTodolistTitle,
    thunkFetchTodolist,
    thunkRemoveTodolist
} from "./state/todo-list/thunks";
import {changeTodolistFilter} from "./state/todo-list/actions";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "./state/todo-list/reducers";
import {thunkAddTask, thunkRemoveTask, thunkUpdateTaskStatus, thunkUpdateTaskTitle} from "./state/task/thunks";

export type TaskStateType = {
    [key:string] : Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkFetchTodolist())
    }, [dispatch])

    const todoList = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const deleteTaskCallback = useCallback((id: string, listId: string) => {
        dispatch(thunkRemoveTask(listId, id))
    }, [dispatch])
    const addTaskCallback = useCallback((title: string, listId: string) => {
        dispatch(thunkAddTask(title, listId))
    }, [dispatch])
    const changeStatusCallback = useCallback((id: string, status: TaskStatuses, listId: string) => {
        dispatch(thunkUpdateTaskStatus(listId, id, status))
    }, [dispatch])
    const changeTaskTitleCallback = useCallback((id: string, newTitle: string, listId: string) => {
        dispatch(thunkUpdateTaskTitle(listId, id, newTitle))
    }, [dispatch])

    const changeFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilter(todoListID, filter))
    }, [dispatch])

    const removeList = useCallback((id: string) => {
        dispatch(thunkRemoveTodolist(id))
    }, [dispatch])

    const changeListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(thunkChangeTodolistTitle(id, newTitle))
    }, [dispatch])

    const addList = useCallback((title: string) => {
        dispatch(thunkAddTodolist(title))
    }, [dispatch])
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Simple Todolist
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoList.map(tl => {
                            debugger
                            return <Grid item>
                                <Paper style={{padding: "20px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        deleteTaskCallback={deleteTaskCallback}
                                        changeFilter={changeFilter}
                                        addTaskCallback={addTaskCallback}
                                        changeStatusCallback={changeStatusCallback}
                                        changeTaskTitle={changeTaskTitleCallback}
                                        changeListTitle={changeListTitle}
                                        filter={tl.filter}
                                        removeListCallback={removeList} />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithRedux
