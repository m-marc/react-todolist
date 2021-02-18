import {TodolistType} from "../../api/todolist-api"
import {TodolistActionTypes} from "./actions";

export type TodolistDomainType = TodolistType & {
    filter?: FilterValuesType,
}
export type FilterValuesType = "all" | "completed" | "active"

const initialState: TodolistType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case "Todolist/remove_list":
            return state.filter(tl => tl.id !== action.listId)
        case 'Todolist/add_list':
            return [action.todo, ...state]
        case 'Todolist/change_title': {
            const todoList = state.find(tl => tl.id === action.id)
            todoList && (todoList.title = action.title)
            return [...state]
        }
        case 'Todolist/change_filter': {
            const todoList = state.find(tl => tl.id === action.id)
            todoList && (todoList.filter = action.filter)
            return [...state]
        }
        case 'Todolist/get_todos':
            return action.todos.map( t => ({...t, filter: "all"}))
        default:
            return state
    }
}