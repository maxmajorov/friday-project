import { TodolistType } from "./../../api/api";
import { FilterValuesType } from "../reducers/todoList-reducer";

// ===== ACTIONS =====
export const SET_TODOLISTS = "SET-TODOLISTS";
export const ADD_NEW_TODOLIST = "ADD-NEW-TODOLIST";
export const CHANGE_FILTER = "CHANGE-FILTER";
export const REMOVE_TODOLIST = "REMOVE-TODOLIST";
export const CHANGE_TITLE = "CHANGE_TITLE";
export const DROP_LIST = "DROP-LIST";

export const setTodosAC = (todoLists: Array<TodolistType>) =>
  ({ type: SET_TODOLISTS, todoLists } as const);

export const addNewTodoListAC = (newItem: string, newTodoListID: string) =>
  ({ type: ADD_NEW_TODOLIST, newItem, newTodoListID } as const);

export const changeFilterAC = (todoListID: string, filter: FilterValuesType) =>
  ({ type: CHANGE_FILTER, filter, todoListID } as const);

export const removeTodoListAC = (todoListID: string) =>
  ({ type: REMOVE_TODOLIST, todoListID } as const);

export const changeTodoListTitleAC = (
  changedTitle: string,
  todoListID: string
) => ({ type: CHANGE_TITLE, changedTitle, todoListID } as const);

// === TYPES ===

export type SetTodosACType = ReturnType<typeof setTodosAC>;

export type ActionsType =
  | SetTodosACType
  | ReturnType<typeof addNewTodoListAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof removeTodoListAC>
  | ReturnType<typeof changeTodoListTitleAC>;
