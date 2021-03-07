import React, { FC } from "react";
import AppBarComponent from "../components/appbar/appbar";
import { makeStyles, Theme, Typography, Grid, Button } from "@material-ui/core";
import { gray, white, primary } from "@area-common/styles";
import ServiceList from "./../components/credentials/serviceList";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: gray.main,
    marginLeft: 125,
    marginTop: 40,
  },
  title: {
    color: gray.light2,
    fontSize: 30,
    textDecoration: "underline",
    textUnderlinePosition: "under",
  },
}));

const CredentialsPage: FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBarComponent />
      <div className={classes.content}>
        <Typography className={classes.title}>Credentials</Typography>
        <ServiceList />
      </div>
    </>
  );
};

export default CredentialsPage;
