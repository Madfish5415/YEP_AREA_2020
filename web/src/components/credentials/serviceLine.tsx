import React, { FC } from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  Typography,
  ListItem,
  Button,
  TextField,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Divider,
} from "@material-ui/core";
import { gray, white, primary } from "@area-common/styles";

const useStyles = makeStyles((theme: Theme) => ({
  content: {},
  serviceName: {
    color: white,
    fontSize: 20,
    fontWeight: "bold",
  },
  logOutButton: {
    height: 28,
    width: 125,
    color: white,
    textTransform: "none",
    fontSize: 14,
    backgroundColor: gray.light2,
    "&:hover": {
      backgroundColor: gray.light1,
    },
  },
  logInButton: {
    height: 28,
    width: 125,
    color: white,
    textTransform: "none",
    fontSize: 14,
    backgroundColor: primary.main,
    "&:hover": {
      backgroundColor: primary.dark2,
    },
  },
  input: {
    color: gray.light3,
    fontSize: 14,
    height: 28,
  },
  textFieldContainer: {
    width: "75%",
  },
}));

const CssTextField = withStyles({
  root: {
    marginTop: 5,
    backgroundColor: gray.main,
    borderRadius: 5,
    height: 28,
    width: 125,
    display: "flex",
    justifyContent: "center",
    "& label.Mui-focused": {
      color: gray.light3,
      borderWidth: "1px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: gray.light3,
      borderWidth: "1px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: gray.light3,
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: gray.light3,
      },
      "&.Mui-focused fieldset": {
        borderColor: gray.light3,
        borderWidth: "1px",
      },
      "&.Mui-disabled": {
        borderColor: gray.light3,
        color: gray.light1,
      },
    },
  },
})(TextField);

type Props = {
  serviceId: string;
  label: string;
  children: React.ReactNode;
  registered?: boolean;
  autologin?: boolean;
  autologinLink?: string;
  setAutologinLink?: React.Dispatch<React.SetStateAction<string>>;
};

const ServiceLine: FC<Props> = (props) => {
  const classes = useStyles();

  const serviceLogIn = async () => {
    console.log("Try to log in user");
    const response = await fetch(
      "http://localhost:8080/api/authentication/services/" +
        props.serviceId +
        "?callbackURL=http://localhost:8081/authentication/services/" +
        props.serviceId
    );
    const json = await response.json();
    console.log("response res", json);
  };

  const serviceLogOut = () => {
    console.log("Try to log out user");
  };

  return (
    <>
      <div className={classes.content}>
        <ListItem>
          <ListItemIcon>{props.children}</ListItemIcon>
          <ListItemText>
            <Typography className={classes.serviceName}>
              {props.label}
            </Typography>
          </ListItemText>
          <ListItemSecondaryAction>
            {props.autologin ? (
              <div className={classes.textFieldContainer}>
                <CssTextField
                  id={props.label}
                  variant={"outlined"}
                  placeholder={"Autologin link"}
                  defaultValue={props.autologinLink}
                  InputProps={{ className: classes.input }}
                  onChange={(
                    event: React.ChangeEvent<
                      HTMLInputElement | HTMLTextAreaElement
                    >
                  ) => props.setAutologinLink!(event.target.value)}
                />
              </div>
            ) : props.registered ? (
              <Button className={classes.logOutButton} onClick={serviceLogOut}>
                Log out
              </Button>
            ) : (
              <Button className={classes.logInButton} onClick={serviceLogIn}>
                Log in
              </Button>
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <Divider />
      </div>
    </>
  );
};

export default ServiceLine;
