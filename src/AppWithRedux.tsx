import React, {useCallback} from 'react'
import './App.css'
import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export interface TaskType {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [key:string] : Array<TaskType>
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type FilterValuesType = "all" | "completed" | "active"

function AppWithRedux() {
    const todoList = useSelector<AppRootStateType, TodolistType[]>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const deleteTaskCallback = useCallback((id: string, listId: string) => {
        dispatch(removeTaskAC(id, listId))
    }, [dispatch])
    const addTaskCallback = useCallback((title: string, listId: string) => {
        dispatch(addTaskAC(title, listId))
    }, [dispatch])
    const changeStatusCallback = useCallback((id: string, status: boolean, listId: string) => {
        dispatch(changeTaskStatusAC(id, status, listId))
    }, [dispatch])
    const changeTaskTitleCallback = useCallback((id: string, newTitle: string, listId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, listId))
    }, [dispatch])

    const changeFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filter))
    }, [dispatch])

    const removeList = useCallback((id: string) => {
        dispatch(RemoveTodoListAC(id))
    }, [dispatch])

    const changeListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(ChangeTodoListTitleAC(id, newTitle))
    }, [dispatch])

    const addList = useCallback((title: string) => {
        dispatch(AddTodoListAC(title))
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
