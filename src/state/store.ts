import {taskReducer} from './task-reducer';
import {todolistReducer} from './todolist-reducer';
import {combineReducers, createStore} from 'redux';


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolist: todolistReducer
})

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>
