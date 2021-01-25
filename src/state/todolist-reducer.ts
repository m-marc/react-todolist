import {FilterValuesType, TodolistType} from "../AppWithRedux"
import {v1} from "uuid";

type ActionType = removeListActionType | addListActionType | changeListTitleActionType | changeListFilterActionType

export type removeListActionType = {
    type: 'REMOVE-TODOLIST',
    todolistId: string
}

export type addListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type changeListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type changeListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

const initialState: TodolistType[] = []

export const todolistReducer = (state: TodolistType[] = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            const newList: TodolistType = {
                id: action.todolistId,
                filter: 'all',
                title: action.title
            }
            return [...state, newList]
        case 'CHANGE-TODOLIST-TITLE':
            const selectedList = state.find(tl => tl.id === action.id)
            if (selectedList){
                selectedList.title = action.title
            }
            return [...state]
        case 'CHANGE-TODOLIST-FILTER':
            const updatedList = state.find(tl => tl.id === action.id)
            if (updatedList) updatedList.filter = action.filter
            return [...state]
        default:
            return state
    }
}

export const RemoveTodoListAC = (todolistId: string): removeListActionType => {
    return {type: "REMOVE-TODOLIST", todolistId}
}
export const AddTodoListAC = (title: string): addListActionType => {
    return {type: "ADD-TODOLIST", title: title, todolistId: v1()}
}
export const ChangeTodoListTitleAC = (id: string, title: string): changeListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): changeListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter: filter, id: id}
}