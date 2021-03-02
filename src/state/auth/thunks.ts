import {Dispatch} from "redux";
import {AuthActionsType, setIsLoggedIn} from "./actions";
import {AppActionsType, setAppInitialize, setAppStatus} from "../app/actions";
import {authAPI} from "../../api/api";
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

export const thunkAuth = () => (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
    authAPI.me()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
            }
            else handleServerAppError(res, dispatch)
            dispatch(setAppInitialize(true))
        })
        .catch(error => handleServerNetworkError(error, dispatch))
}

export const thunkLogout = () => (dispatch: Dispatch<AuthActionsType>) => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
                dispatch(setAppStatus('succeeded'))
            } else handleServerAppError(res, dispatch)
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}