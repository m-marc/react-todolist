import {AuthActionsType} from "./actions";

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "Login/IS_LOGGED_IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}