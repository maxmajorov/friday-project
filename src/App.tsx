import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Authorization } from "./components/Authorization/Authorization";
import { Error404 } from "./components/Error404/Error404";
import { NewPassword } from "./components/NewPassword/NewPassword";
import { Profile } from "./components/Profile/Profile";
import { RecoverPassword } from "./components/RecoverPassword/RecoverPassword";
import { Registration } from "./components/Registartion/Registration";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { TestPage } from "./components/TestPage/TestPage";

export const PATH = {
  PROFILE: "/profile",
  AUTHORIZATION: "/auth",
  REGISTRATION: "/register",
  RECOVER_PASSWORD: "/recover-password",
  NEW_PASSWORD: "/new-password",
  TEST_PAGE: "/test-page",
};

export const App = () => {
  return (
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path={"/"} element={<Navigate to={PATH.PROFILE} />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.AUTHORIZATION} element={<Authorization />} />
        <Route path={PATH.REGISTRATION} element={<Registration />} />
        <Route path={PATH.RECOVER_PASSWORD} element={<RecoverPassword />} />
        <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={PATH.TEST_PAGE} element={<TestPage />} />
        <Route path={"*"} element={<Error404 />} />
      </Routes>
    </div>
  );
};
