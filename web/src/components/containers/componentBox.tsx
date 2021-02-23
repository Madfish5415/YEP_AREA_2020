import React, { FC, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Box,
} from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: 40,
      marginBottom: 40,
      width: 200,
      height: 120,
      borderRadius: 22,
      backgroundColor: primary.main,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    boxTitle: {
      textAlign: "center",
      fontSize: 20,
    },
  })
);

type Props = {
  label: string;
};

const ComponentBox: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Box boxShadow={3} className={classes.content}>
        <Typography className={classes.boxTitle}>{props.label}</Typography>
      </Box>
    </>
  );
};

export default ComponentBox;
