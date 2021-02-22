import React, { FC, useState } from "react";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
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
      <div className={classes.content}>
        <Typography className={classes.boxTitle}>{props.label}</Typography>
      </div>
    </>
  );
};

export default ComponentBox;
