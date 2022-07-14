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

  const status = useAppSelector(appStatusSelect);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.currentTarget.value);
  };

  const checkedHandler = () => {
    setPrivate(!_private);
  };

  return (
    <UniversalModal status={status} action={action}>
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
          <Button variant="contained" style={{ marginRight: "10px" }}>
            cancel
          </Button>
          <Button variant="contained" onClick={() => addItem(value, _private)}>
            save
          </Button>
        </div>
      </div>
    </UniversalModal>
  );
};
