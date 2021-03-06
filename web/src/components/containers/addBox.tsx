import React, { FC } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  Box,
} from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      marginTop: 40,
      marginBottom: 40,
      width: 200,
      height: 120,
      borderRadius: 22,
      backgroundColor: primary.main,
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      marginTop: 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      fontSize: 50,
    },
    boxTitle: {
      textAlign: "center",
      fontSize: 15,
      fontWeight: "bold",
    },
  })
);

type Props = {
  label: string;
};

const AddBox: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Box boxShadow={3} className={classes.content}>
        <Add className={classes.icon} />
        <Typography className={classes.boxTitle}>New {props.label}</Typography>
      </Box>
    </>
  );
};

export default AddBox;
