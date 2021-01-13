import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from './todolist-reducer'
import {v1} from "uuid"
import {FilterValuesType, TodolistType} from "../App"

let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[]

beforeEach( () => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})

test('selected todolist should be removed', () => {

    const endState = todolistReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('selected todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('selected todolist should change its title', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('selected filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todolistReducer(startState, ChangeTodoListFilterAC(todolistId2,newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
