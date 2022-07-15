import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Button from "@mui/material/Button";
import { Link, Navigate } from "react-router-dom";
import { PATH } from "../../components/common/routes/RoutesConstants";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import {
  addCardTC,
  cardsPageCountSelect,
  cardsPageSelect,
  cardsSelect,
  deleteCardTC,
  getCardsListTC,
  getSortCardsListTC,
  setCardsPageAC,
  setCardsPageCountAC,
  totalCardsCountSelect,
  updateCardTC,
} from "../../bll/reducers/cards-reducer";
import LinearProgress from "@mui/material/LinearProgress";
import { appStatusSelect } from "../../bll/reducers/app-reducer";
import { packIdSelect } from "../../bll/reducers/packs-reducer";
import { useDebounce } from "../../utils/useDebounce";
import { PaginationSelect } from "../../components/pagination/PaginationSelect";
import {
  isLoggedInSelector,
  userIDSelector,
} from "../../bll/reducers/auth-reducer";
import { SearchForm } from "../../components/searchForm/SearchForm";
import { AddNewCardModal } from "../../components/modal/AddNewCardModal";
import style from "./CardsTable.module.css";
import { DeleteModal } from "../../components/modal/DeleteModal";
import { EditCardModal } from "../../components/modal/EditCardModal";
import { Grade } from "../../components/grade/Grade";

interface Data {
  question: string;
  answer: string;
  lastUpdated: Date;
  grade: string;
  actions: string;
}

interface HeadCell {
  id: keyof Data;
  disablePadding: boolean;
  label: string;
  textAlign: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "question",
    textAlign: "left",
    disablePadding: false,
    label: "Question",
  },
  {
    id: "answer",
    textAlign: "center",
    disablePadding: true,
    label: "Answer",
  },
  {
    id: "lastUpdated",
    textAlign: "center",
    disablePadding: true,
    label: "Last updated",
    sortable: true,
  },
  {
    id: "grade",
    textAlign: "center",
    disablePadding: false,
    label: "Grade",
  },
  {
    id: "actions",
    textAlign: "center",
    disablePadding: false,
    label: "Actions",
  },
];

const EnhancedTableToolbar = () => {
  return (
    <Toolbar>
      <Link to={PATH.PACKS_LIST}>
        <Button style={{ marginRight: "10px" }}>
          <ArrowBackOutlinedIcon />
        </Button>
      </Link>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Pack Name
      </Typography>
    </Toolbar>
  );
};

const EnhancedTableHead: React.FC = () => {
  const [updated, setUpdated] = useState<"0grade" | "1grade">("1grade");

  const dispatch = useAppDispatch();

  const packID = useAppSelector(packIdSelect);
  const page = useAppSelector(cardsPageSelect);
  const rowsPerPage = useAppSelector(cardsPageCountSelect);

  const sortByUpdateHandler = () => {
    setUpdated(updated === "0grade" ? "1grade" : "0grade");
    dispatch(getSortCardsListTC(page, rowsPerPage, packID, updated));
  };

  return (
    <TableHead style={{ backgroundColor: "rgba(0, 0, 0, 0.226)" }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.textAlign}
            padding="normal"
          >
            {headCell.label}
            <TableSortLabel
              active={headCell.label === "Grade"}
              direction={updated === "1grade" ? "asc" : "desc"}
              onClick={sortByUpdateHandler}
            ></TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const CardsTable = () => {
  const [value, setValue] = React.useState("");

  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const cardsSelector = useAppSelector(cardsSelect);
  const cardsTotalCount = useAppSelector(totalCardsCountSelect);
  const page = useAppSelector(cardsPageSelect);
  const rowsPerPage = useAppSelector(cardsPageCountSelect);
  const packID = useAppSelector(packIdSelect);
  const status = useAppSelector(appStatusSelect);
  const userID = useAppSelector(userIDSelector);

  // ==== SEARCHING =====

  const debouncedValue = useDebounce<string>(value, 1500);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  // ОРГАНИЗОВАТЬ ПОИСК!!!

  React.useEffect(() => {
    dispatch(getCardsListTC(page, rowsPerPage, packID));
  }, [dispatch, debouncedValue, packID, page, rowsPerPage]);

  const handleChangePage = (newPage: number) => {
    dispatch(setCardsPageAC(newPage));
  };

  const handleChangeRowsPerPage = (pageCount: number) => {
    dispatch(setCardsPageCountAC(pageCount));
  };

  // ==== ACTIONS ====

  // ==== ADD NEW CARD ====

  const addNewCardHandler = (newQuestion: string, newAnswer: string) => {
    dispatch(addCardTC(page, rowsPerPage, newQuestion, newAnswer, packID));
  };

  // ==== DELETE CARD ====

  const deleteCardHandler = (cardID: string) => {
    dispatch(deleteCardTC(page, rowsPerPage, cardID));
  };

  // ==== UPDATE CARD ====

  const updateCardHandler = (
    cardID: string,
    newQuestion: string,
    newAnswer: string
  ) => {
    dispatch(updateCardTC(page, rowsPerPage, cardID, newQuestion, newAnswer));
  };

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <>
      {status === "loading" && <LinearProgress />}
      <Box className={style.container}>
        <EnhancedTableToolbar />
        <div className={style.search}>
          <SearchForm
            status={status}
            value={value}
            onChangeHandler={onChangeHandler}
          />
          <AddNewCardModal
            action={"Add new card"}
            addItem={addNewCardHandler}
          />
        </div>

        <TableContainer className={style.tableContainer}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead />
            <TableBody>
              {cardsSelector.length ? (
                cardsSelector.map((card, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover key={index}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "question")
                            ?.textAlign
                        }
                        style={{ paddingLeft: "15px" }}
                      >
                        {card.question.length > 15
                          ? `${card.question.slice(0, 15)}...`
                          : card.question}
                      </TableCell>
                      <TableCell
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "answer")
                            ?.textAlign
                        }
                      >
                        {card.answer.length > 15
                          ? `${card.answer.slice(0, 15)}...`
                          : card.answer}
                      </TableCell>
                      <TableCell
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "lastUpdated")
                            ?.textAlign
                        }
                      >
                        {card.updated.slice(0, 10)}
                      </TableCell>
                      <TableCell
                        padding="normal"
                        align={
                          headCells.find((cell) => cell.id === "grade")
                            ?.textAlign
                        }
                      >
                        <Grade value={card.grade} />
                      </TableCell>
                      <TableCell align="center" style={{ display: "flex" }}>
                        {userID === card.user_id ? (
                          <>
                            <DeleteModal
                              title={"Delete card"}
                              name={card.question}
                              packID={card._id}
                              action={"Delete"}
                              deleteItem={deleteCardHandler}
                            />
                            <EditCardModal
                              question={card.question}
                              answer={card.answer}
                              cardID={card._id}
                              action={"Edit"}
                              updateItem={updateCardHandler}
                            />
                          </>
                        ) : (
                          <div style={{ padding: "3px 0" }}>not available</div>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <div>Cards not found...</div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationSelect
          title={"Cards per page"}
          disable={status === "loading"}
          totalCount={cardsTotalCount}
          pageCount={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeValue={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};
