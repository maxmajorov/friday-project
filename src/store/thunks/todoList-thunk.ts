import { todoAPI } from "../../api/api";
import { setTodosAC } from "../actions";
import { AnyAction, Dispatch } from "redux";

export const getTodoListsThunkCreator = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    todoAPI.getTodolists().then((response) => {
      dispatch(setTodosAC(response.data));
    });
  };
};
