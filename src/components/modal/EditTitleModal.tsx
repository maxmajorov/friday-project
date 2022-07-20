import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import { UniversalModal } from "./Modal";
import { useAppSelector } from "../../bll/store";
import { appStatusSelect } from "../../bll/reducers/app-reducer";
// import { useNavigate } from "react-router-dom";

type PropsType = {
  name: string;
  packID: string;
  action: string;
  updateItem: (packID: string, value: string) => void;
};

export const EditTitleModal: React.FC<PropsType> = ({
  name,
  packID,
  action,
  updateItem,
}) => {
  const [value, setValue] = useState(name);
  const [open, setOpen] = useState(false);

  const status = useAppSelector(appStatusSelect);

  const onCloseHandler = () => {
    setOpen(false);
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.currentTarget.value);
  };

  return (
    <UniversalModal
      status={status}
      action={action}
      open={open}
      setOpen={setOpen}
    >
      <div>
        <h3>Edit pack's title</h3>
        <hr />
        <Input
          defaultValue={value}
          placeholder={"Pack's name"}
          disabled={status === "loading"}
          onChange={onChangeHandler}
          style={{ margin: "20px 0" }}
        />
        <div>
          <Button
            variant="contained"
            style={{ marginRight: "10px" }}
            onClick={onCloseHandler}
          >
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              updateItem(packID, value);
              setOpen(true);
            }}
            disabled={!value}
          >
            save
          </Button>
        </div>
      </div>
    </UniversalModal>
  );
};
