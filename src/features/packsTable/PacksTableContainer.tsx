import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../bll/store";
import { Navigate } from "react-router-dom";
import { PATH } from "../../components/common/routes/RoutesConstants";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import { isLoggedInSelector } from "../../bll/reducers/auth-reducer";
import { appStatusSelect } from "../../bll/reducers/app-reducer";
import { Input } from "@mui/material";
import { getCardsListTC } from "../../bll/reducers/cards-reducer";
import { PacksTable } from "./PacksTable";

const ariaLabel = { "aria-label": "description" };

export const PacksTableContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const status = useAppSelector(appStatusSelect);

  useEffect(() => {
    // dispatch(getCardsListTC());
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  // const onClickHandler = () => {
  //   dispatch(getCardsListTC());
  // };

  return (
    <>
      {status === "loading" && <LinearProgress />}
      <div>
        <Grid container justifyContent="center" spacing={0.5}>
          <Grid item xs={2}>
            <Paper
              sx={{
                height: 900,
              }}
            >
              <div>Show packs cards</div>
              <button>my</button>
              {/* <button onClick={onClickHandler}>all</button> */}
            </Paper>
          </Grid>

          <Grid item xs={8}>
            <Paper
              sx={{
                height: 900,
              }}
            >
              Packs list
              <div>
                <Input defaultValue="Search" inputProps={ariaLabel} />
                <button>add new pack</button>
              </div>
              <PacksTable />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
