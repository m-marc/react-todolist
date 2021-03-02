import {AppActionsType as ActionsType, RequestStatusType} from "./actions";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/set_status':
            return {...state, status: action.status}
        case "app/set_error":
            return {...state, error: action.error}
        case "app/set_initialize":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}