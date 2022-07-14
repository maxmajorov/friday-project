import React, { useEffect, useState } from "react";
import style from "./CardLearn.module.css";
import commonStyle from "../../assets/styles/Common.module.css";
import { Button, Checkbox } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PATH } from "../../components/common/routes/RoutesConstants";
import { CardType } from "../../api/cards-api";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  cardsPageCountSelect,
  cardsPageSelect,
  cardsSelect,
  getCardsListTC,
  setCardGradeTC,
} from "../../bll/reducers/cards-reducer";

const grades = [
  "Don't know",
  "Forgot",
  "A lot of thought",
  "Confused",
  "Knew the answer",
];

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce(
    (acc, card) => acc + (6 - card.grade) * (6 - card.grade),
    0
  );
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 }
  );
  console.log("test: ", sum, rand, res);

  return cards[res.id + 1];
};

export const CardLearn: React.FC = () => {
  const [show, setShow] = useState(false);
  const [first, setFirst] = useState(true);
  const [checkGrade, setCheckGrade] = useState(1);

  console.log("grade", checkGrade);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelect);
  const page = useAppSelector(cardsPageSelect);
  const pageCount = useAppSelector(cardsPageCountSelect);

  const [card, setCard] = useState<CardType>({
    _id: "fake",
    cardsPack_id: "",
    user_id: "",
    answer: "answer fake",
    question: "question fake",
    grade: 0,
    shots: 0,
    comments: "",
    type: "",
    rating: 0,
    more_id: "",
    created: "",
    updated: "",
    __v: 0,
  });

  // interface LocationType {
  //   question: string;
  //   answer: string;
  // }

  // const location = useLocation();
  // let { question, answer } = location.state as LocationType;

  useEffect(() => {
    console.log("LearnContainer useEffect");

    if (first) {
      // dispatch(getCardsListTC(page, pageCount, id));
      setFirst(false);
    }

    if (cards.length > 0) setCard(getCard(cards));

    return () => {
      console.log("LearnContainer useEffect off");
    };
  }, [dispatch, id, cards, first]);

  const onNextHandler = () => {
    setShow(false);

    if (cards.length > 0) {
      // dispatch(setCardGradeTC(cardID, checkGrade));
      setCard(getCard(cards));
    } else {
    }
  };

  const showHandler = () => {
    setShow(true);
  };

  return (
    <div className={commonStyle.container}>
      <div className={style.wrapper}>
        <div className={style.heading}>
          <h2 className={commonStyle.title}>Learn</h2>
        </div>
        <div className={style.question}>
          <span className={style.label}>
            <b>Question: </b>
          </span>
          {card.question}
        </div>
        {show ? (
          <>
            <div className={style.answer}>
              <span className={style.label}>
                <b>Answer: </b>
              </span>
              {card.answer}
            </div>
            <div className={style.grades}>
              {grades.map((g, i) => (
                <div style={{ textAlign: "left" }}>
                  <Checkbox
                    key={i}
                    checked={i + 1 === checkGrade}
                    onClick={() => setCheckGrade(i + 1)}
                  />
                  {g}
                </div>
              ))}
            </div>
          </>
        ) : null}
        <div className={style.controls}>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={() => navigate(PATH.PACKS_LIST)}
          >
            Cancel
          </Button>
          {!show ? (
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={showHandler}
            >
              Show answer
            </Button>
          ) : (
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={onNextHandler}
              //   disabled={disableBtn}
            >
              Next question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
