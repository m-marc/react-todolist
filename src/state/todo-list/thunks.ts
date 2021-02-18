import {Dispatch} from "redux";
import {todolistAPI} from "../../api/todolist-api";
import {addTodolist, changeTodolistTitle, getTodolist, removeTodolist} from "./actions";
import {setAppStatus} from "../app/actions";

export const thunkFetchTodolist = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
     todolistAPI.getTodos()
        .then(res => {
            dispatch(getTodolist(res.data))
            dispatch(setAppStatus('succeeded'))
        })
}

export const thunkRemoveTodolist = (listId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
     todolistAPI.deleteList(listId)
        .then(() => {
            dispatch(removeTodolist(listId))
            dispatch(setAppStatus('succeeded'))
        })
}

export const thunkAddTodolist = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTodo(title)
        .then(res => {
            dispatch(addTodolist(res.data.item))
            dispatch(setAppStatus('succeeded'))
        })
}

export const thunkChangeTodolistTitle = (id: string, title: string) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        todolistAPI.updateList(id, title)
            .then(() => {
                dispatch(changeTodolistTitle(id, title))
                dispatch(setAppStatus('succeeded'))
            })
}

