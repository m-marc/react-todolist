import {TodolistType} from "../../api/todolist-api";
import {FilterValuesType} from "./reducers";
import {RequestStatusType} from "../app/actions";

export const removeTodolist = (listId: string) => 
    ({type: "Todolist/remove_list", listId} as const)
export type RemoveListAction = ReturnType<typeof removeTodolist>

export const getTodolist = (todos: TodolistType[]) =>
    ({type: 'Todolist/get_todos', todos} as const)
export type getTodolistAction = ReturnType<typeof getTodolist>

export const addTodolist = (todo: TodolistType) =>
    ({type: 'Todolist/add_list', todo} as const)
export type addTodolistAction = ReturnType<typeof addTodolist>

export const changeTodolistTitle = (id: string, title: string) =>
    ({type: 'Todolist/change_title', id, title} as const)
export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitle>

export const changeTodolistFilter = (id: string, filter: FilterValuesType) => 
    ({type: 'Todolist/change_filter', id, filter} as const)
export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilter>

export const changeTodolistEntityStatus = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'Todolist/change_entity_status', id, entityStatus} as const)
export type changeTodolistEntityStatusAction = ReturnType<typeof changeTodolistEntityStatus>

export type TodolistActionTypes = RemoveListAction
    | getTodolistAction
    | addTodolistAction
    | changeTodolistTitleAction
    | changeTodolistFilterAction
    | changeTodolistEntityStatusAction