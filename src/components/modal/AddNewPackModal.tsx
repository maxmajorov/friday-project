import React, { useState } from "react";
import { Button, Checkbox, Input } from "@mui/material";
import { UniversalModal } from "./Modal";
import { useAppSelector } from "../../bll/store";
import { appStatusSelect } from "../../bll/reducers/app-reducer";

type PropsType = {
  action: string;
  addItem: (value: string, _private: boolean) => void;
};

export const AddNewPackModal: React.FC<PropsType> = ({ action, addItem }) => {
  const [value, setValue] = useState("");
  const [_private, setPrivate] = useState(false);
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

  const checkedHandler = () => {
    setPrivate(!_private);
  };

  return (
    <UniversalModal
      status={status}
      action={action}
      open={open}
      setOpen={setOpen}
    >
      <div>
        <h3>Add new pack</h3>
        <hr />
        <Input
          defaultValue={value}
          placeholder={"Pack's name"}
          disabled={status === "loading"}
          onChange={onChangeHandler}
          style={{ marginTop: "20px" }}
        />
        <div style={{ margin: "20px 0" }}>
          <Checkbox checked={_private} onChange={checkedHandler} /> Private pack
        </div>
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
              addItem(value, _private);
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
