import {TodolistType} from "../../api/todolist-api"
import {ACTION_TYPES, TodolistActionTypes} from "./actions";

export type TodolistDomainType = TodolistType & {
    filter?: FilterValuesType,
}
export type FilterValuesType = "all" | "completed" | "active"

const initialState: TodolistType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case ACTION_TYPES.REMOVE_LIST:
            return state.filter(tl => tl.id !== action.listId)
        case ACTION_TYPES.ADD_LIST:
            return [action.todo, ...state]
        case ACTION_TYPES.CHANGE_TITLE: {
            const todoList = state.find(tl => tl.id === action.id)
            todoList && (todoList.title = action.title)
            return [...state]
        }
        case ACTION_TYPES.CHANGE_FILTER: {
            const todoList = state.find(tl => tl.id === action.id)
            todoList && (todoList.filter = action.filter)
            return [...state]
        }
        case ACTION_TYPES.GET_TODOS:
            return action.todos.map( t => ({...t, filter: "all"}))
        default:
            return state
    }
}