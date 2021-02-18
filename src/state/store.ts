import {taskReducer} from './task/reducers';
import {todolistReducer} from './todo-list/reducers';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from "redux-thunk";
import {appReducer} from "./app/reducers";


const rootReducer = combineReducers({
    tasks: taskReducer,
    todolist: todolistReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
