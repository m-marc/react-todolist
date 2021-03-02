import {TodolistType} from "../../api/api"
import {TodolistActionTypes} from "./actions";
import {RequestStatusType} from "../app/actions";

export type TodolistDomainType = TodolistType & {
    filter?: FilterValuesType,
    entityStatus?: RequestStatusType
}
export type FilterValuesType = "all" | "completed" | "active"

const initialState: TodolistType[] = []

export const todolistReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case "Todolist/remove_list":
            return state.filter(tl => tl.id !== action.listId)
        case 'Todolist/add_list':
            return [action.todo, ...state]
        case 'Todolist/change_title':
            return state.map( tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'Todolist/change_filter':
            return state.map( tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'Todolist/get_todos':
            return action.todos.map( t => ({...t, filter: "all"}))
        case "Todolist/change_entity_status":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}