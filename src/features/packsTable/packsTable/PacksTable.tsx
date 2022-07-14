import React, { ChangeEvent, useEffect, useState } from "react";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "../../../bll/store";
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import {
  addPackTC,
  deletePackTC,
  getSearchPacksListTC,
  getSortPacksListTC,
  packsSelect,
  pageCountSelect,
  pageSelect,
  setPackIdAC,
  setPageAC,
  setPageCountAC,
  totalPacksCountSelect,
  updatePackNameTC,
} from "../../../bll/reducers/packs-reducer";
import { PATH } from "../../../components/common/routes/RoutesConstants";
import { useNavigate } from "react-router-dom";
import { appStatusSelect } from "../../../bll/reducers/app-reducer";
import { useDebounce } from "../../../utils/useDebounce";
import { userIDSelector } from "../../../bll/reducers/auth-reducer";
import { PaginationSelect } from "../../../components/pagination/PaginationSelect";
import { SearchForm } from "../../../components/searchForm/SearchForm";
import style from "./PacksTable.module.css";
import { DeleteModal } from "../../../components/modal/DeleteModal";
import { AddNewPackModal } from "../../../components/modal/AddNewPackModal";
import { EditTitleModal } from "../../../components/modal/EditTitleModal";

interface Data {
  id: string;
  name: string;
  cards: number;
  create: string;
  update: string;
  createdBy: string;
  actions: string;
  label: string;
  arrow: string;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  textAlign: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  sortable?: boolean;
  disablePadding: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    textAlign: "left",
    disablePadding: true,
    label: "Name",
  },
  {
    id: "arrow",
    textAlign: "left",
    disablePadding: true,
    label: "",
  },
  {
    id: "cards",
    textAlign: "center",
    disablePadding: false,
    label: "Cards",
  },
  {
    id: "update",
    textAlign: "center",
    disablePadding: false,
    label: "Last updated",
  },
  {
    id: "createdBy",
    textAlign: "center",
    disablePadding: false,
    label: "Created by",
  },
  {
    id: "actions",
    textAlign: "center",
    disablePadding: false,
    label: "Actions",
  },
];

const EnhancedTableHead: React.FC = () => {
  const [updated, setUpdated] = useState<"0updated" | "1updated">("1updated");

  const dispatch = useAppDispatch();

  const page = useAppSelector(pageSelect);
  const rowsPerPage = useAppSelector(pageCountSelect);

  const sortByUpdateHandler = () => {
    setUpdated(updated === "0updated" ? "1updated" : "0updated");
    dispatch(getSortPacksListTC(page, rowsPerPage, updated));
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
            <TableSortLabel
              active={headCell.label === "Last updated"}
              direction={updated === "1updated" ? "asc" : "desc"}
              onClick={sortByUpdateHandler}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const PacksTable: React.FC = () => {
  const [value, setValue] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const totalPacksCount = useAppSelector(totalPacksCountSelect);
  const packsSelector = useAppSelector(packsSelect);
  const status = useAppSelector(appStatusSelect);
  const page = useAppSelector(pageSelect);
  const rowsPerPage = useAppSelector(pageCountSelect);
  const userID = useAppSelector(userIDSelector);

  // ==== SEARCHING =====

  const debouncedValue = useDebounce<string>(value, 1500);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (debouncedValue.length) {
      dispatch(getSearchPacksListTC(debouncedValue));
      dispatch(setPageAC(1));
    }
  }, [dispatch, debouncedValue, page, rowsPerPage]);

  //=================================

  const handleChangePage = (newPage: number) => {
    dispatch(setPageAC(newPage));
  };

  const handleChangeRowsPerPage = (pageCount: number) => {
    dispatch(setPageCountAC(pageCount));
  };

  // ==== ACTIONS ====

  // ==== ADD NEW PACK ====

  const addNewPackHandler = (newValue: string, _private: boolean) => {
    dispatch(addPackTC(page, rowsPerPage, newValue, _private));
  };

  // ==== DELETE PACK ====

  const deletePackHandler = (packID: string) => {
    dispatch(deletePackTC(page, rowsPerPage, packID));
  };

  // ==== UPDATE PACK NAME ====

  const updatePackHandler = (packID: string, newValue: string) => {
    dispatch(updatePackNameTC(page, rowsPerPage, packID, newValue));
  };

  return (
    <Box className={style.container}>
      <div className={style.search}>
        <SearchForm
          status={status}
          value={value}
          onChangeHandler={onChangeHandler}
        />
        <AddNewPackModal action={"Add new pack"} addItem={addNewPackHandler} />
      </div>

      <TableContainer className={style.tableContainer}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
        >
          <EnhancedTableHead />
          <TableBody>
            {packsSelector.length ? (
              packsSelector.map((card, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover key={index}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align={
                        headCells.find((cell) => cell.id === "name")?.textAlign
                      }
                      style={{ paddingLeft: "15px" }}
                    >
                      {card.name.length > 15
                        ? `${card.name.slice(0, 15)}...`
                        : card.name}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        disabled={status === "loading"}
                        onClick={() => {
                          dispatch(setPackIdAC(card._id));
                          navigate(PATH.CARDS_LIST);
                        }}
                      >
                        <KeyboardTabIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      padding="normal"
                      align={
                        headCells.find((cell) => cell.id === "cards")?.textAlign
                      }
                    >
                      {card.cardsCount}
                    </TableCell>
                    <TableCell
                      padding="normal"
                      align={
                        headCells.find((cell) => cell.id === "update")
                          ?.textAlign
                      }
                    >
                      {card.updated.slice(0, 10)}
                    </TableCell>
                    <TableCell padding="normal" align={"center"}>
                      {card.user_name}
                    </TableCell>
                    <TableCell align="right" style={{ display: "flex" }}>
                      {userID === card.user_id ? (
                        <>
                          <DeleteModal
                            title={"Delete pack"}
                            name={card.name}
                            packID={card._id}
                            action={"Delete"}
                            deleteItem={deletePackHandler}
                          />
                          <EditTitleModal
                            name={card.name}
                            packID={card._id}
                            action={"Edit"}
                            updateItem={updatePackHandler}
                          />
                        </>
                      ) : null}
                      <IconButton disabled={status === "loading"}>
                        <LocalLibraryIcon color={"info"} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <div>Packs not found...</div> //Стилизовать!!!
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationSelect
        title={"Packs per page"}
        disable={status === "loading"}
        totalCount={totalPacksCount}
        pageCount={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeValue={handleChangeRowsPerPage}
      />
    </Box>
  );
};
