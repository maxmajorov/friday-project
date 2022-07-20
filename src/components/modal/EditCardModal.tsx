import React, { useState } from "react";
import { Button, Input } from "@mui/material";
import { UniversalModal } from "./Modal";
import { useAppSelector } from "../../bll/store";
import { appStatusSelect } from "../../bll/reducers/app-reducer";

type PropsType = {
  question: string;
  answer: string;
  cardID: string;
  action: string;
  updateItem: (packID: string, question: string, answer: string) => void;
};

export const EditCardModal: React.FC<PropsType> = ({
  question,
  answer,
  cardID,
  action,
  updateItem,
}) => {
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswer, setNewAnswer] = useState(answer);
  const [open, setOpen] = useState(false);

  const status = useAppSelector(appStatusSelect);

  const onCloseHandler = () => {
    setOpen(false);
  };

  const onChangeQuestionHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewQuestion(event.currentTarget.value);
  };

  const onChangeAnswerHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewAnswer(event.currentTarget.value);
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
          defaultValue={question}
          placeholder={"Question"}
          disabled={status === "loading"}
          onChange={onChangeQuestionHandler}
          style={{ margin: "20px 0" }}
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
              updateItem(cardID, newQuestion, newAnswer);
              setOpen(true);
            }}
            disabled={!newQuestion || !newAnswer}
          >
            save
          </Button>
        </div>
      </div>
    </UniversalModal>
  );
};
