import React from "react";
import classes from "./Error404.module.css";

const Error404 = () => {
  return (
    <div className={classes.errorPage}>
      <div>
        <h1 className={classes.errorNum}>-404-</h1>
      </div>
      <div>
        <h2 className={classes.errorTitle}>Page not found!</h2>
      </div>

      <canvas id="canv"></canvas>
    </div>
  );
};

export default Error404;
