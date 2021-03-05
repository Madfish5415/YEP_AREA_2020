import React, { FC } from "react";
import Loader from "react-loader-spinner";
import { makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export const DefaultState: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Loader type={"Puff"} />
    </div>
  );
};
