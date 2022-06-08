import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.css";

export const Sidebar = () => {
  return (
    <aside className={classes.sidebar}>
      <ul className="sidebar__list list-reset">
        <li className={classes.item}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              classes.link + " " + (isActive ? classes.active : "")
            }
          >
            Profile
          </NavLink>
        </li>
        <li className={classes.item}>
          <NavLink
            to="/auth"
            className={({ isActive }) =>
              classes.link + " " + (isActive ? classes.active : "")
            }
          >
            Authorization
          </NavLink>
        </li>
        <li className={classes.item}>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              classes.link + " " + (isActive ? classes.active : "")
            }
          >
            Registration
          </NavLink>
        </li>
        <li className={classes.item}>
          <NavLink
            to="/recover-password"
            className={({ isActive }) =>
              classes.link + " " + (isActive ? classes.active : "")
            }
          >
            Recover password
          </NavLink>
        </li>
        <li className={classes.item}>
          <NavLink
            to="/new-password"
            className={({ isActive }) =>
              classes.link + " " + (isActive ? classes.active : "")
            }
          >
            New password
          </NavLink>
        </li>
        <li className={classes.item}>
          <NavLink
            to="/test-page"
            className={({ isActive }) =>
              classes.link + " " + (isActive ? classes.active : "")
            }
          >
            Test page
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
