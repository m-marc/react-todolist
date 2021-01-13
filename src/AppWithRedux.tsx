import React from 'react'
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

    const deleteTaskCallback = (id: string, listId: string) => {
        dispatch(removeTaskAC(id, listId))
    }
    const addTaskCallback = (title: string, listId: string) => {
        dispatch(addTaskAC(title, listId))
    }
    const changeStatusCallback = (id: string, status: boolean, listId: string) => {
        dispatch(changeTaskStatusAC(id, status, listId))
    }
    const changeTaskTitleCallback = (id: string, newTitle: string, listId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, listId))
    }

    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filter))
    }

    const removeList = (id: string) => {
        dispatch(RemoveTodoListAC(id))
    }

    const changeListTitle = (id: string, newTitle: string) => {
        dispatch(ChangeTodoListTitleAC(id, newTitle))
    }

    const addList = (title: string) => {
        dispatch(AddTodoListAC(title))
    }

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
                            let filteredTasks = tasks[tl.id]
                            if (tl.filter === "completed") filteredTasks = tasks[tl.id].filter(t => t.isDone)
                            else if (tl.filter === "active") filteredTasks = tasks[tl.id].filter(t => !t.isDone)
                            return <Grid item>
                                <Paper style={{padding: "20px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={filteredTasks}
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
