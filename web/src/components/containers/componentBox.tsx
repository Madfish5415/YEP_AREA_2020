import React, { FC, useState } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Box,
} from "@material-ui/core";
import { gray, primary, secondary } from "@area-common/styles";
import { BorderStyle } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      display: "flex",
      flexDirection: "row",
    },
    elemBox: {
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
    bulletLink: {
      width: 20,
      height: 20,
      borderRadius: 10,
      position: "relative",
      marginLeft: "-10px",
      alignSelf: "center",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: gray.main,
      backgroundColor: secondary.main,
      alignItems: "center",
      justifyContent: "center",
    },
    textDiv: {
      display: "flex",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    bulletText: {
      fontSize: 11,
      textAlign: "center",
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
        <Box boxShadow={3} className={classes.elemBox}>
          <Typography className={classes.boxTitle}>{props.label}</Typography>
        </Box>
        <div className={classes.bulletLink}>
          <div className={classes.textDiv}>
            <Typography className={classes.bulletText}>1</Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentBox;
