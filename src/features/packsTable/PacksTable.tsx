import React, { useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import {
  AppRootStateType,
  useAppDispatch,
  useAppSelector,
} from "../../bll/store";
import { Delete } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import ApiIcon from "@mui/icons-material/Api";
import TablePagination from "@mui/material/TablePagination";
import { getPacksListTC } from "../../bll/reducers/packs-reducer";
import { PATH } from "../../components/common/routes/RoutesConstants";
import { useNavigate } from "react-router-dom";

export type cardType = {
  _id: string;
  user_id: string;
  name: string;
  cardsCount: number;
  created: string;
  updated: string;
};

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "Cards",
    numeric: true,
    disablePadding: false,
    label: "Cards",
  },
  {
    id: "LastUpdated",
    numeric: true,
    disablePadding: false,
    label: "Last updated",
  },
  {
    id: "CreatedBy",
    numeric: true,
    disablePadding: false,
    label: "Created by",
  },
  {
    id: "Actions",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

export function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export function PacksTable() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  // const totalPacksCount = useSelector<AppRootStateType, number | null>(
  //   (state) => state.cards.cardPacksTotalCount
  // );
  const cardPacks = useAppSelector((state) => state.packs.packsCards);

  useEffect(() => {
    dispatch(getPacksListTC(page, rowsPerPage));

    // dispatch(getCardsListTC(1, 8, "62c551acbe53c41174945eec"));
    // dispatch(
    //   addCardTC(1, 8, "React???", "Library", "62c551acbe53c41174945eec")
    // );
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={"medium"}>
            <EnhancedTableHead />
            <TableBody>
              {cardPacks.map((card, index) => {
                return (
                  <TableRow
                    hover
                    key={index}
                    onClick={() =>
                      navigate(PATH.CARDS_LIST, {
                        state: { pack_id: card._id },
                      })
                    }
                  >
                    <TableCell component="th" scope="row" padding="none">
                      {card.name}
                    </TableCell>
                    <TableCell align="right">{card.cardsCount}</TableCell>
                    <TableCell align="right">
                      {card.updated.slice(0, 10)}
                    </TableCell>
                    <TableCell align="right">
                      {card.created.slice(0, 10)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <ApiIcon />
                      </IconButton>
                      <IconButton>
                        <Delete />
                      </IconButton>
                      <IconButton>
                        <CreateIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          rowsPerPage={rowsPerPage}
          count={1}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

// totalPacksCount ? totalPacksCount : cardPacks.length
