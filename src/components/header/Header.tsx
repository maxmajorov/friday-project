import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../common/routes/RoutesConstants";
import cardsIcon from "../../assets/img/cardsIcon.png";
import profileIcon from "../../assets/img/profileIcon.png";
import style from "./Header.module.css";

export const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <nav className={style.nav_list}>
          <NavLink
            to={PATH.PACKS_LIST}
            className={({ isActive }) =>
              style.link + " " + (isActive ? style.active : "")
            }
          >
            <img src={cardsIcon} className={style.icon} alt="card-icon" />
            Packs list
          </NavLink>

          <NavLink
            to={PATH.PROFILE}
            className={({ isActive }) =>
              style.link + " " + (isActive ? style.active : "")
            }
          >
            <img src={profileIcon} className={style.icon} alt="card-icon" />
            Profile
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
