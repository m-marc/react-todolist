import React from 'react'
import './App.css'
import {AppBar, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {RequestStatusType} from "./state/app/actions";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {TodolistContainer} from "./containers/TodolistContainer/TodolistContainer";

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <div className="App">
            <ErrorSnackbar />
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
            <div style={{minHeight: '4px'}}>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </div>
            <TodolistContainer />
        </div>
    );
}

export default App
