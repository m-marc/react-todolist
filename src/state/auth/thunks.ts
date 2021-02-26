import {Dispatch} from "redux";
import {AuthActionsType, setIsLoggedIn} from "./actions";
import {setAppStatus} from "../app/actions";
import {authAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

export const thunkLogin = (data: any) => (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
                dispatch(setAppStatus('succeeded'))
            } else handleServerAppError(res, dispatch)
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}