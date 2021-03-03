import React, { FC } from "react";
import {
  makeStyles,
  Theme,
  Typography,
  Grid,
  Button,
  Divider,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";
import { User } from "@area-common/types";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    width: "100%",
    maxWidth: "100%",
  },
  userText: {
    color: white,
  },
  userButton: {
    backgroundColor: primary.main,
    textTransform: "none",
    color: white,
    height: 30,
    width: 150,
    "&:hover": {
      backgroundColor: primary.dark2,
    },
  },
  divider: {
    color: gray.light2,
    height: 2,
  },
}));

type Props = {
  user: User;
};

const UserLine: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        <ListItem>
          <ListItemText className={classes.userText}>
            {props.user.username}
          </ListItemText>
          <ListItemSecondaryAction>
            <Button className={classes.userButton}>Manage</Button>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider className={classes.divider} />
      </div>
    </>
  );
};

export default UserLine;
