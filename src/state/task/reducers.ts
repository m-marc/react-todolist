import {TaskStateType} from "../../AppWithRedux"
import {TASK_ACTION_TYPES, TasksActionTypes} from "./actions";
import {ACTION_TYPES} from "../todo-list/actions";

const initialState: TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState, action: TasksActionTypes) => {
    switch (action.type) {
        case TASK_ACTION_TYPES.SET_TASKS: {
            const stateCopy = {...state}
            stateCopy[action.listId] = action.tasks
            return stateCopy
        }
        case ACTION_TYPES.GET_TODOS: {
            const stateCopy = {...state}
            action.todos.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case TASK_ACTION_TYPES.REMOVE_TASK: {
            const stateCopy = {...state}
            stateCopy[action.listId] = stateCopy[action.listId]
                .filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case TASK_ACTION_TYPES.ADD_TASK: {
            debugger
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [action.task, ...tasks];
            return stateCopy;
        }
        case TASK_ACTION_TYPES.CHANGE_STATUS: {
            return {
                ...state,
                [action.listId]: state[action.listId]
                    .map(t => t.id === action.taskId
                        ? {...t, status: action.status}
                        : t)
            }
        }
        case TASK_ACTION_TYPES.CHANGE_TITLE: {
            return {
                ...state,
                [action.listId]: state[action.listId]
                    .map(t => t.id === action.taskId
                        ? {...t, title: action.title}
                        : t)
            }
        }
        case ACTION_TYPES.ADD_LIST:
            return {
                ...state,
                [action.todo.id]: []
            }
        case ACTION_TYPES.REMOVE_LIST: {
            const stateCopy = {...state}
            delete stateCopy[action.listId]
            return stateCopy
        }
        default:
            return state
    }
}
