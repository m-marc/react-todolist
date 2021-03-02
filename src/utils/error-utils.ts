import { setAppError, setAppStatus, AppActionsType as ActionsType } from '../state/app/actions';
import { Dispatch } from 'redux';
import { ResponseType } from '../api/api';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) dispatch(setAppError(data.messages[0]))
    else dispatch(setAppError('Some error occurred'))
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppError(error.message))
    dispatch(setAppStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<ActionsType>