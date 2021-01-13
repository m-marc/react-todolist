import React, {useReducer, useState} from 'react'
import './App.css'
import {v1} from "uuid";
import Todolist from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/task-reducer";

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

const listId1 = v1()
const listId2 = v1()

const initData: TaskStateType = {
    [listId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "Vanilla JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
    ],
    [listId2]: [
        {id: v1(), title: "PS4", isDone: true},
        {id: v1(), title: "TV", isDone: true},
        {id: v1(), title: "PS5", isDone: false},
        {id: v1(), title: "Cyberpunk 2077", isDone: false},
    ]
}

const initTodolist: Array<TodolistType> = [
    {
        id: listId1,
        title: "What to learn",
        filter: "all",
    },
    {
        id: listId2,
        title: "What to buy",
        filter: "active",
    }
]

function AppWithReducers() {
    const [tasks, dispatchTasks] = useReducer(taskReducer, initData)
    const [todoList, dispatchTodolist] = useReducer(todolistReducer, initTodolist)

    const deleteTaskCallback = (id: string, listId: string) => {
        dispatchTasks(removeTaskAC(id, listId))
    }
    const addTaskCallback = (title: string, listId: string) => {
        dispatchTasks(addTaskAC(title, listId))
    }
    const changeStatusCallback = (id: string, status: boolean, listId: string) => {
        dispatchTasks(changeTaskStatusAC(id, status, listId))
    }
    const changeTaskTitleCallback = (id: string, newTitle: string, listId: string) => {
        const action = changeTaskTitleAC(id, newTitle, listId)
        dispatchTasks(action)
    }

    const changeFilter = (todoListID: string, filter: FilterValuesType) => {
        const action = ChangeTodoListFilterAC(todoListID, filter)
        dispatchTodolist(action)
    }

    const removeList = (id: string) => {
        const action = RemoveTodoListAC(id)
        dispatchTodolist(action)
        dispatchTasks(action)
    }

    const changeListTitle = (id: string, newTitle: string) => {
        const action = ChangeTodoListTitleAC(id, newTitle)
        dispatchTodolist(action)
    }

    const addList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchTasks(action)
        dispatchTodolist(action)
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

export default AppWithReducers
