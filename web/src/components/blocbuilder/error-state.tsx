import {StatusError} from "@area-common/types";
import {Box, makeStyles, Theme} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import React, {FC} from "react";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  alert: {
    margin: "1rem 0",
    width: "40%",
  },
}));

type Props = {
  error: StatusError;
};

export const ErrorState: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Alert severity="error" className={classes.alert}>
        {props.error.code + " " + props.error.message}
      </Alert>
    </Box>
  );
}
