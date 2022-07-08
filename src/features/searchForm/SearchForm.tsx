import React, { useState } from "react";
import style from "./SearchForm.module.css";
import commonStyle from "../../assets/styles/Common.module.css";
import { Autocomplete, InputAdornment, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CardPacksType } from "../../api/packs-api";

type SearchFormPropsType = {
  data: Array<CardPacksType>;
};

export const SearchForm: React.FC<SearchFormPropsType> = ({ data }) => {
  const [value, setValue] = useState("");

  // const searchHandler = () => {
  //   alert("fgfg");
  // };

  const filteredData = data.filter((pack) =>
    pack.name.toLowerCase().includes(value.toLowerCase())
  );

  console.log(filteredData);

  return (
    <TextField
      InputProps={{
        type: "search",
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};
