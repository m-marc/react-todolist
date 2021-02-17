import {TodolistType} from "../../api/todolist-api";
import {FilterValuesType} from "./reducers";

export enum ACTION_TYPES {
    REMOVE_LIST= 'REMOVE_LIST',
    ADD_LIST = 'ADD_TODOLIST',
    CHANGE_TITLE = 'CHANGE_LIST_TITLE',
    CHANGE_FILTER = 'CHANGE_LIST_FILTER',
    GET_TODOS = 'GET_TODOS'
}

export const removeTodolist = (listId: string) => 
    ({type: ACTION_TYPES.REMOVE_LIST, listId} as const)
export type RemoveListAction = ReturnType<typeof removeTodolist>

export const getTodolist = (todos: TodolistType[]) =>
    ({type: ACTION_TYPES.GET_TODOS, todos} as const)
export type getTodolistAction = ReturnType<typeof getTodolist>

export const addTodolist = (todo: TodolistType) =>
    ({type: ACTION_TYPES.ADD_LIST, todo} as const)
export type addTodolistAction = ReturnType<typeof addTodolist>

export const changeTodolistTitle = (id: string, title: string) =>
    ({type: ACTION_TYPES.CHANGE_TITLE, id, title} as const)
export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitle>

export const changeTodolistFilter = (id: string, filter: FilterValuesType) => 
    ({type: ACTION_TYPES.CHANGE_FILTER, id, filter} as const)
export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilter>

export type TodolistActionTypes = RemoveListAction 
    | getTodolistAction 
    | addTodolistAction 
    | changeTodolistTitleAction
    | changeTodolistFilterAction