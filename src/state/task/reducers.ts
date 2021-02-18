import {TaskStateType} from "../../AppWithRedux"
import {TasksActionTypes} from "./actions";

const initialState: TaskStateType = {}

export const taskReducer = (state: TaskStateType = initialState, action: TasksActionTypes) => {
    switch (action.type) {
        case 'Task/get_tasks': {
            const stateCopy = {...state}
            stateCopy[action.listId] = action.tasks
            return stateCopy
        }
        case 'Todolist/get_todos': {
            const stateCopy = {...state}
            action.todos.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case 'Task/remove_task': {
            const stateCopy = {...state}
            stateCopy[action.listId] = stateCopy[action.listId]
                .filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case 'Task/add_task': {
            debugger
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            stateCopy[action.task.todoListId] = [action.task, ...tasks];
            return stateCopy;
        }
        case 'Task/change_status': {
            return {
                ...state,
                [action.listId]: state[action.listId]
                    .map(t => t.id === action.taskId
                        ? {...t, status: action.status}
                        : t)
            }
        }
        case 'Task/change_title': {
            return {
                ...state,
                [action.listId]: state[action.listId]
                    .map(t => t.id === action.taskId
                        ? {...t, title: action.title}
                        : t)
            }
        }
        case 'Todolist/add_list':
            return {
                ...state,
                [action.todo.id]: []
            }
        case "Todolist/remove_list": {
            const stateCopy = {...state}
            delete stateCopy[action.listId]
            return stateCopy
        }
        default:
            return state
    }
}
