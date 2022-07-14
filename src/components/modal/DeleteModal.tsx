import React from "react";
import { Button } from "@mui/material";
import { UniversalModal } from "./Modal";
import { useAppSelector } from "../../bll/store";
import { appStatusSelect } from "../../bll/reducers/app-reducer";

type PropsType = {
  title: string;
  name: string;
  packID: string;
  action: string;
  deleteItem: (packID: string) => void;
};

export const DeleteModal: React.FC<PropsType> = ({
  title,
  packID,
  name,
  action,
  deleteItem,
}) => {
  const status = useAppSelector(appStatusSelect);

  return (
    <UniversalModal status={status} action={action}>
      <div>
        <h3>{title}</h3>
        <hr />
        {title === "Delete pack" ? (
          <p>
            Do you really want to remove <b>{name}</b>? All cards will be
            excluded from this course.
          </p>
        ) : (
          <p>
            Do you really want to remove <b>{name}</b>?
          </p>
        )}

        <div>
          <Button variant="contained" style={{ marginRight: "10px" }}>
            cancel
          </Button>
          <Button
            variant="contained"
            color={"error"}
            onClick={() => deleteItem(packID)}
          >
            delete
          </Button>
        </div>
      </div>
    </UniversalModal>
  );
};
