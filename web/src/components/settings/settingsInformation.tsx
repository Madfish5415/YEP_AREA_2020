import React, { FC } from "react";
import { makeStyles, Theme, Typography, Grid } from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { User } from "@area-common/types";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginLeft: 125,
    marginTop: 40,
    display: "flex",
  },
  infoTitle: {
    color: white,
    fontSize: 30,
    fontWeight: "bold",
  },
}));

type Props = {
  user: User;
  updateUser: (id: string, user: Partial<User>) => void;
};

const SettingsInformation: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.infoTitle}>Information</Typography>
      </div>
    </>
  );
};

export default SettingsInformation;
