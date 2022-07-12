import React from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./SearchForm.module.css";

type SearchFormType = {
  title: string;
  status: string;
  value: string;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addNewItemHandler: () => void;
};

export const SearchForm: React.FC<SearchFormType> = ({
  title,
  status,
  value,
  onChangeHandler,
  addNewItemHandler,
}) => {
  return (
    <div className={style.search}>
      <TextField
        fullWidth
        size={"small"}
        placeholder="Search"
        disabled={status === "loading"}
        value={value}
        onChange={onChangeHandler}
        InputProps={{
          type: "search",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        disabled={status === "loading"}
        className={style.search_btn}
        style={{ width: "30%", marginLeft: "30px" }}
        onClick={addNewItemHandler}
      >
        {title}
      </Button>
    </div>
  );
};
