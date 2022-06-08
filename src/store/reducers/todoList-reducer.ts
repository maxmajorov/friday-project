import { TodolistType } from "../../api/api";
import {
  ActionsType,
  ADD_NEW_TODOLIST,
  CHANGE_FILTER,
  CHANGE_TITLE,
  REMOVE_TODOLIST,
  SET_TODOLISTS,
} from "../actions/todo-actions";

const initialState: Array<TodoListDomainType> = [];

export const todoListReducer = (
  state: Array<TodoListDomainType> = initialState,
  action: ActionsType
): Array<TodoListDomainType> => {
  switch (action.type) {
    case SET_TODOLISTS: {
      return action.todoLists.map((tl) => ({ ...tl, filter: "all" }));
    }

    case REMOVE_TODOLIST: {
      return state.filter((tl) => tl.id !== action.todoListID);
    }

    case CHANGE_FILTER: {
      return state.map((tl) =>
        tl.id === action.todoListID ? { ...tl, filter: action.filter } : tl
      );
    }

    case CHANGE_TITLE: {
      return state.map((tl) =>
        tl.id === action.todoListID ? { ...tl, title: action.changedTitle } : tl
      );
    }

    case ADD_NEW_TODOLIST:
      return state; // Дописать

    default: {
      return state;
    }
  }
};

// TYPES
export type FilterValuesType = "all" | "active" | "completed";
type TodoListDomainType = TodolistType & {
  filter: FilterValuesType;
};
