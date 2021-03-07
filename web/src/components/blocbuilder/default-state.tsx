import React, { FC } from "react";
import Loader from "react-loader-spinner";
import {Backdrop, CircularProgress, makeStyles, Theme, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    color: "#ffffff",
    zIndex: 100,
  },
}));

export const DefaultState: FC = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
};
