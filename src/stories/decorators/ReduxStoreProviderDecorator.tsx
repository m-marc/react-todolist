import React from 'react';

import {Provider} from "react-redux";
import {combineReducers, createStore} from 'redux'
import {taskReducer} from '../../state/task/reducers'
import {todolistReducer} from '../../state/todo-list/reducers'
import {AppRootStateType} from '../../state/store'

const rootReducer = combineReducers({
    tasks: taskReducer,
    todolist: todolistReducer
})

const initialGlobalState = {};

export const storyBookStore = createStore(rootReducer, initialGlobalState as unknown as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
