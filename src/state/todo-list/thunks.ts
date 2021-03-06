import {Dispatch} from "redux";
import {api} from "../../api/api";
import {addTodolist, changeTodolistEntityStatus, changeTodolistTitle, getTodolist, removeTodolist} from "./actions";
import {setAppStatus} from "../app/actions";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export const thunkFetchTodolist = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
     api.getTodos()
        .then(res => {
            dispatch(getTodolist(res.data))
            dispatch(setAppStatus('succeeded'))
        })
         .catch(error => handleServerNetworkError(error, dispatch))
}

export const thunkRemoveTodolist = (listId: string) => (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatus(listId, "loading"))
    dispatch(setAppStatus('loading'))
     api.deleteList(listId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolist(listId))
                dispatch(setAppStatus('succeeded'))
            }
            else handleServerAppError(res.data, dispatch)
        })
         .catch(error => handleServerNetworkError(error, dispatch))
}

export const thunkAddTodolist = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    api.createTodo(title)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(addTodolist(res.data.item))
                dispatch(setAppStatus('succeeded'))
            }
            else handleServerAppError(res, dispatch)
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const thunkChangeTodolistTitle = (id: string, title: string) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatus('loading'))
        api.updateList(id, title)
            .then(() => {
                dispatch(changeTodolistTitle(id, title))
                dispatch(setAppStatus('succeeded'))
            })
            .catch(error => handleServerNetworkError(error, dispatch))
}

