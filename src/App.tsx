import React, {useCallback, useEffect} from 'react'
import './App.css'
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {RequestStatusType} from "./state/app/actions";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {TodolistContainer} from "./containers/TodolistContainer/TodolistContainer";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Login} from "./components/Login/Login";
import {thunkAuth, thunkLogout} from "./state/auth/thunks";

function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect( ()=> {
        dispatch(thunkAuth())
    }, [dispatch])

    const logoutHandle = useCallback(() => {
        dispatch(thunkLogout())
    }, [dispatch])

    if (!isInitialized) return <CircularProgress />

    return <BrowserRouter>
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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandle}>Log out</Button>}
                </Toolbar>
            </AppBar>
            <div style={{minHeight: '4px'}}>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </div>
            <Container fixed>
                <Switch>
                    <Route path={"/react-todolist"} component={TodolistContainer} />
                    <Route path={"/login"} component={Login} />
                    <Route render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                </Switch>
            </Container>
        </div>
    </BrowserRouter>
}

export default App
