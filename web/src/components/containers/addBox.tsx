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
      display: "flex",
      marginTop: 40,
      width: 200,
      height: 120,
      borderRadius: 22,
      backgroundColor: primary.main,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    icon: {
      marginTop: 30,
      display: "flex",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      fontSize: 50,
      color: gray.main,
    },
    boxTitle: {
      display: "flex",
      flexGrow: 1,
      textAlign: "center",
      fontSize: 15,
      fontWeight: "bold",
      color: gray.main,
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
