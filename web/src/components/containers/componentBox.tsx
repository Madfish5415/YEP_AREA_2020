import { gray, primary } from "@area-common/styles";
import {
  Box,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { FC } from "react";

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
      color: gray.main,
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
      </div>
    </>
  );
};

export default ComponentBox;
