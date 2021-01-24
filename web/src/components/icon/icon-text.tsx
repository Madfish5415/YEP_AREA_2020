import React, { FC } from "react";
import {Avatar, makeStyles, Typography} from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import {red} from "@area-common/styles";

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: "64px",
    height: "64px",
    backgroundColor: red[500]
  },
  text: {
    fontSize: 16,
  }
});

type Props = {
  icon: SvgIconComponent;
  text: string;
};

export const IconTextComponent: FC<Props> = (props) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar}><props.icon fontSize={"large"} /></Avatar>
      <Typography className={classes.text}>{props.text}</Typography>
    </div>
  );
};
