import React, { FC } from "react";
import { makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
}));

type Props = {
  errorLabel: string;
};

export const ErrorState: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography>{props.errorLabel}</Typography>
    </div>
  );
};
