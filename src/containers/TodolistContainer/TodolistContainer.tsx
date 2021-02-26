import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {thunkAddTodolist, thunkFetchTodolist} from "../../state/todo-list/thunks";
import {AppRootStateType} from "../../state/store";
import {TodolistDomainType} from "../../state/todo-list/reducers";
import {Grid, Paper} from "@material-ui/core";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import Todolist from "../../components/Todolist/Todolist";

export const TodolistContainer: React.FC = () => {
    const dispatch = useDispatch()
    const todoList = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolist)

    useEffect(() => {
        dispatch(thunkFetchTodolist())
    }, [dispatch])

    const addNewList = useCallback((title: string) => {
        dispatch(thunkAddTodolist(title))
    }, [dispatch])

    return <>
        <Grid container style={{padding: "20px 0"}}>
            <AddItemForm addItem={addNewList} />
        </Grid>
        <Grid container spacing={3}>
            {
                todoList.map(tl => <Grid item key={tl.id}>
                    <Paper style={{padding: "20px"}}>
                        <Todolist
                            key={tl.id}
                            list={tl}
                        />
                    </Paper>
                </Grid>)
            }
        </Grid>
    </>
}