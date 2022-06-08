import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  authReducer,
  changePassReducer,
  profileReducer,
  recoverPassReducer,
  registrationReducer,
} from "./reducers";

// ======Создаем Store======

const rootReducers = combineReducers({
  profile: profileReducer,
  authorization: authReducer,
  recoverPassword: recoverPassReducer,
  changePassword: changePassReducer,
  registration: registrationReducer,
});

type RootReducersType = typeof rootReducers;

export const store: Store<RootStateType> = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export type RootStateType = ReturnType<RootReducersType>;

//@ts-ignore
window.store = store;
