import { SET_TODOLISTS } from "./../actions/todo-actions";
import { TaskType } from "../../api/api";
import {
  TaskActionsType,
  ADD_NEW_TASK,
  ADD_EMPTY_ARRAY_TASK,
  CHANGE_TASK_STATUS,
  CHANGE_TASK_TITLE,
  REMOVE_TASK,
  SET_TASKS,
} from "../actions/tasks-actions";

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

let initialState: TaskStateType = {};

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: TaskActionsType
): TaskStateType => {
  switch (action.type) {
    case SET_TODOLISTS: {
      const stateCopy = { ...state };
      action.todoLists.forEach((tl) => (stateCopy[tl.id] = []));
      return stateCopy;
    }

    case REMOVE_TASK: {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].filter(
          (el) => el.id !== action.taskID
        ),
      };
    }

    //ИСПРАВИТЬ
    // case ADD_NEW_TASK: {
    //   return {
    //     ...state,
    //     [action.todoListID]: [action.newTaskName, state[action.todoListID]],
    //   };
    // }

    case SET_TASKS: {
      return { ...state, [action.todoListID]: action.tasks };
    }

    case CHANGE_TASK_TITLE: {
      return {
        ...state,
        [action.todoListID]: state[action.todoListID].map((task) =>
          task.id === action.taskID
            ? { ...task, text: action.changedTaskName }
            : task
        ),
      };
    }

    // case CHANGE_TASK_STATUS: {
    //   const todoList = state[action.todoListID]; //находим по ID нужный todoList
    //   const changedStatustask = todoList.map(
    //     (el) => (el.id === action.taskID ? { ...el, isDone: !el.isDone } : el) // перезаписываем с учетом нового статуса таски
    //   );
    //   state = { ...state, [action.todoListID]: changedStatustask };
    //   return state;
    // }

    default:
      return state;
  }
};
