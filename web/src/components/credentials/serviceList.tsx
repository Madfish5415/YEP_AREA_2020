import React, { FC, useState } from "react";
import { makeStyles, Theme, Typography, List, Button } from "@material-ui/core";
import { gray, white, primary } from "@area-common/styles";
import ServiceLine from "./serviceLine";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import ExplicitIcon from "@material-ui/icons/Explicit";

const useStyles = makeStyles((theme: Theme) => ({
  content: {},
  icon: {
    color: primary.main,
  },
}));

const ServiceList: FC = () => {
  const classes = useStyles();
  const [autologin, setAutologin] = useState("");

  return (
    <>
      <List>
        <ServiceLine label={"Instagram"} registered>
          <InstagramIcon className={classes.icon} />
        </ServiceLine>
        <ServiceLine label={"GitHub"}>
          <GitHubIcon className={classes.icon} />
        </ServiceLine>
        <ServiceLine
          label={"Epitech"}
          autologin
          autologinLink={autologin}
          setAutologinLink={setAutologin}
        >
          <ExplicitIcon className={classes.icon} />
        </ServiceLine>
      </List>
    </>
  );
};

export default ServiceList;
