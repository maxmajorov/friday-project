import { authReducer } from "../bll/reducers/auth-reducer";

let testState: { isLoggedIn: boolean; userID: string };

test("logged is successful", () => {
  testState = {
    isLoggedIn: false,
    userID: "",
  };

  let newState = authReducer(testState, { type: "AUTH/login", value: true });

  expect(newState).not.toBe(testState);
  expect(newState.isLoggedIn).toBe(true);
});

test("logout is successful", () => {
  testState = {
    isLoggedIn: true,
    userID: "",
  };

  let newState = authReducer(testState, { type: "AUTH/login", value: false });

  expect(newState).not.toBe(testState);
  expect(newState.isLoggedIn).toBe(false);
});
