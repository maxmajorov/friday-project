import { taskAPI } from "../../api/api";
import { setTasksAC } from "../actions";
import { Dispatch } from "redux";
import { TaskActionsType } from "../actions/tasks-actions";

export const getTasksThunkCreator = (todoListID: string) => {
  return (dispatch: Dispatch<TaskActionsType>) => {
    taskAPI.getTasks(todoListID).then((response) => {
      dispatch(setTasksAC(response.data.items, todoListID));
    });
  };
};
