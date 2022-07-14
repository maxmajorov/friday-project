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

  const status = useAppSelector(appStatusSelect);

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
    <UniversalModal status={status} action={action}>
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
          style={{ marginTop: "20px" }}
        />

        <div>
          <Button variant="contained" style={{ marginRight: "10px" }}>
            cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              addItem(question, answer);
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
