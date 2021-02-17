import {Dispatch} from "redux";
import {todolistAPI} from "../../api/todolist-api";
import {addTodolist, changeTodolistTitle, getTodolist, removeTodolist} from "./actions";

export const thunkFetchTodolist = () => (dispatch: Dispatch) => {
     todolistAPI.getTodos()
        .then(res => dispatch(getTodolist(res.data)))
}

export const thunkRemoveTodolist = (listId: string) => (dispatch: Dispatch) => {
     todolistAPI.deleteList(listId)
        .then(res => dispatch(removeTodolist(listId)))
}

export const thunkAddTodolist = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodo(title)
        .then(res => dispatch(addTodolist(res.data.item)))
}

export const thunkChangeTodolistTitle = (id: string, title: string) =>
    (dispatch: Dispatch) => {
        todolistAPI.updateList(id, title)
            .then(res => dispatch(changeTodolistTitle(id, title)))
}

