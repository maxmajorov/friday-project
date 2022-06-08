import { TaskType } from "../../api/api";
import { SetTodosACType } from "./todo-actions";

export const SET_TASKS = "SET-TASKS";
export const ADD_NEW_TASK = "ADD-NEW-TASK";
export const REMOVE_TASK = "REMOVE-TASK";
export const CHANGE_TASK_STATUS = "CHANGE-TASK-STATUS";
export const CHANGE_TASK_TITLE = "CHANGE-TASK-TITLE";
export const ADD_EMPTY_ARRAY_TASK = "ADD-EMPTY-ARRAY-TASK";

export const setTasksAC = (tasks: Array<TaskType>, todoListID: string) =>
  ({ type: SET_TASKS, tasks, todoListID } as const);

export const addNewTaskAC = (newTaskName: string, todoListID: string) =>
  ({ type: ADD_NEW_TASK, newTaskName, todoListID } as const);

export const changeTaskStatusAC = (
  taskID: string,
  isDone: boolean,
  todoListID: string
) => ({ type: CHANGE_TASK_STATUS, taskID, isDone, todoListID } as const);

export const removeTaskAC = (taskID: string, todoListID: string) =>
  ({ type: REMOVE_TASK, taskID, todoListID } as const);

export const changeTaskTitleAC = (
  changedTaskName: string,
  todoListID: string,
  taskID: string
) =>
  ({ type: CHANGE_TASK_TITLE, changedTaskName, todoListID, taskID } as const);

export type TaskActionsType =
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof addNewTaskAC>
  | ReturnType<typeof changeTaskStatusAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof changeTaskTitleAC>
  | SetTodosACType;
