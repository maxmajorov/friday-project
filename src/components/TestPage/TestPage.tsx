import React from "react";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../common/c3-SuperCheckbox/SuperCheckbox";
import { SuperEditableSpan } from "../../common/c4-SuperEditableSpan/SuperEditableSpan";
import { SuperSelect } from "../../common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../common/c6-SuperRadio/SuperRadio";
import SuperRange from "../../common/c7-SuperRange/SuperRange";
import { SuperInput } from "../../common/SuperInput/SuperInput";
import classes from "./TestPage.module.css";

export const TestPage = () => {
  return (
    <div className={classes.container}>
      <SuperInput />
      <hr />
      <SuperButton />
      <hr />
      <SuperCheckbox />
      <hr />
      <SuperSelect />
      <hr />
      <SuperRadio />
      <hr />
      <SuperRange value={10} />
      <hr />
      <SuperEditableSpan />
      <hr />
    </div>
  );
};
