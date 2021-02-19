import {TasksActionTypes} from "./actions";
import {TaskType} from "../../api/todolist-api";

export type TaskStateType = { [key:string] : Array<TaskType> }
const initialState: TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState, action: TasksActionTypes) => {
    switch (action.type) {
        case 'Task/get_tasks':
            return {...state, [action.listId]: action.tasks}
        case 'Todolist/get_todos': {
            const stateCopy = {...state}
            action.todos.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case 'Task/remove_task':
            return {...state, [action.listId]: state[action.listId].filter(t => t.id !== action.taskId)}
        case 'Task/add_task':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "Task/update_task":
            return {
                ...state,
                [action.listId]: state[action.listId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'Task/change_entity_status':
            return {
                ...state,
                [action.listId]: state[action.listId]
                    .map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t)
            }
        case 'Todolist/add_list':
            return {...state, [action.todo.id]: []}
        case "Todolist/remove_list": {
            const stateCopy = {...state}
            delete stateCopy[action.listId]
            return stateCopy
        }
        default:
            return state
    }
}
