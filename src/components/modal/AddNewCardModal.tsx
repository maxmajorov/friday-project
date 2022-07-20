import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import { UniversalModal } from "./Modal";
import { useAppSelector } from "../../bll/store";
import { appStatusSelect } from "../../bll/reducers/app-reducer";

type PropsType = {
  action: string;
  addItem: (newQuestion: string, newAnswer: string) => void;
};

export const AddNewCardModal: React.FC<PropsType> = ({ action, addItem }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [open, setOpen] = useState(false);

  const status = useAppSelector(appStatusSelect);

  const onCloseHandler = () => {
    setOpen(false);
  };

  const onChangeQuestionHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestion(event.currentTarget.value);
  };

  const onChangeAnswerHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnswer(event.currentTarget.value);
  };

  return (
    <UniversalModal
      status={status}
      action={action}
      open={open}
      setOpen={setOpen}
    >
      <div>
        <h3>Add new card</h3>
        <hr />
        <Input
          defaultValue={question}
          placeholder={"Question"}
          disabled={status === "loading"}
          onChange={onChangeQuestionHandler}
          style={{ marginTop: "20px" }}
        />
        <Input
          defaultValue={answer}
          placeholder={"Answer"}
          disabled={status === "loading"}
          onChange={onChangeAnswerHandler}
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
              addItem(question, answer);
              setOpen(true);
            }}
            disabled={!question || !answer}
          >
            save
          </Button>
        </div>
      </div>
    </UniversalModal>
  );
};
