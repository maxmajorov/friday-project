import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import style from "./SearchForm.module.css";

type SearchFormType = {
  status: string;
  value: string;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export const SearchForm: React.FC<SearchFormType> = ({
  status,
  value,
  onChangeHandler,
}) => {
  return (
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
  );
};
