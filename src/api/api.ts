import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: { "API-KEY": "196d543e-854d-4840-b68c-b0f81150459a" },
  withCredentials: true,
});

// ==== TODO ====

export const todoAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>("/todo-lists");
  },

  createTodolist() {
    return instance.post<
      CommonResponseType<{
        item: TodolistType;
      }>
    >("/todo-lists", {
      title: "newToDo",
    });
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`);
  },

  updateTodolistTitle(payload: updatePayloadType) {
    return instance.put<CommonResponseType>(
      `/todo-lists/${payload.todolistId}`,
      {
        title: payload.title,
      }
    );
  },
};

// ==== TYPES ====

type CommonResponseType<T = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: T;
};

export type TodolistType = {
  id: string;
  addedDate: string;
  order: number;
  title: string;
};

type updatePayloadType = {
  todolistId: string;
  title: string;
};

// ==== TASKS ====

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<TasksResponseType>(`/todo-lists/${todolistId}/tasks`);
  },

  createTask(payload: updatePayloadType) {
    return instance.post<BaseTaskResponseType>(
      `/todo-lists/${payload.todolistId}/tasks`,
      {
        title: payload.title,
      }
    );
  },

  deleteTask(payload: deleteTaskPayloadType) {
    return instance.delete<BaseTaskResponseType>(
      `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`
    );
  },

  updateTaskTitle(payload: updateTaskTitlePayloadType) {
    return instance.put<BaseTaskResponseType>(
      `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
      {
        title: payload.title,
      }
    );
  },
};

// ==== TYPES ====

type BaseTaskResponseType<T = {}> = {
  fieldsErrors: Array<string>;
  messages: Array<string>;
  resultCode: number;
  data: T;
};

type TasksResponseType = {
  items: Array<TaskType>;
  error: string;
  totalCount: number;
};

export type TaskType = {
  addedDate: string;
  deadline: null;
  description: null;
  id: string;
  order: number;
  priority: 1;
  startDate: number;
  status: 0;
  title: string;
  todoListId: string;
};

type deleteTaskPayloadType = {
  todolistId: string;
  taskId: string;
};

type updateTaskTitlePayloadType = {
  todolistId: string;
  taskId: string;
  title: string;
};
