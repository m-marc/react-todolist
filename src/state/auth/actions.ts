import {AppActionsType} from "../app/actions";

export const setIsLoggedIn = (value: boolean) => ({type: "Login/IS_LOGGED_IN", value} as const)

export type AuthActionsType = ReturnType<typeof setIsLoggedIn> | AppActionsType