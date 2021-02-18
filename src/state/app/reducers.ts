import {ActionsType, RequestStatusType} from "./actions";

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/set_status':
            return {...state, status: action.status}
        case "app/set_error":
            return {...state, error: action.error}
        default:
            return state
    }
}