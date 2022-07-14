import React from "react";
import { Button } from "@mui/material";
import { UniversalModal } from "./Modal";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  deletePackTC,
  pageCountSelect,
  pageSelect,
} from "../../bll/reducers/packs-reducer";
import { appStatusSelect } from "../../bll/reducers/app-reducer";

type PropsType = {
  name: string;
  packID: string;
  action: string;
};

export const EditModal: React.FC<PropsType> = ({ packID, name, action }) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(appStatusSelect);
  const page = useAppSelector(pageSelect);
  const rowsPerPage = useAppSelector(pageCountSelect);

  const deletePackHandler = () => {
    dispatch(deletePackTC(page, rowsPerPage, packID));
  };

  return (
    <UniversalModal status={status} action={action}>
      <div>
        <h3>Delete Pack</h3>
        <hr />
        <p>
          Do you really want to remove <b>{name}</b>? All cards will be excluded
          from this course.
        </p>
        <div>
          <Button variant="contained" style={{ marginRight: "10px" }}>
            cancel
          </Button>
          <Button
            variant="contained"
            color={"error"}
            onClick={deletePackHandler}
          >
            delete
          </Button>
        </div>
      </div>
    </UniversalModal>
  );
};
