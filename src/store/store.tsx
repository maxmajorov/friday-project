import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { tasksReducer, todoListReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// ======Создаем Store======

const rootReducers = combineReducers({
  todoList: todoListReducer,
  task: tasksReducer,
});

type RootReducersType = typeof rootReducers;

// export const store = configureStore({
//   reducer: rootReducers,
// });

export const store: Store<RootStateType> = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export type RootStateType = ReturnType<RootReducersType>;

//@ts-ignore
window.store = store;
