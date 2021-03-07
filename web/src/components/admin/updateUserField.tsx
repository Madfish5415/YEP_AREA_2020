import React, { FC } from "react";
import {
  makeStyles,
  withStyles,
  TextField,
  Theme,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    marginTop: 10,
    marginBottom: 30,
  },
  fieldTitle: {
    fontSize: 20,
    color: gray.light2,
    marginBottom: 5,
  },
  inputAndButton: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    color: gray.light3,
    fontSize: 20,
  },
  updateButton: {
    marginLeft: 20,
    marginTop: 5,
    height: 35,
    width: 125,
    color: white,
    textTransform: "none",
    fontSize: 15,
    backgroundColor: primary.main,
    "&:hover": {
      backgroundColor: primary.dark2,
    },
  },
}));

const CssTextField = withStyles({
  root: {
    marginTop: 5,
    backgroundColor: gray.light2,
    borderRadius: 5,
    height: 35,
    width: 300,
    display: "flex",
    justifyContent: "center",
    "& label.Mui-focused": {
      color: gray.main,
      borderWidth: "0px",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: gray.main,
      borderWidth: "0px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: gray.main,
        borderWidth: "0px",
      },
      "&:hover fieldset": {
        borderColor: gray.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: gray.main,
        borderWidth: "0px",
      },
      "&.Mui-disabled": {
        borderColor: gray.main,
        color: gray.light1,
      },
    },
  },
})(TextField);

type Props = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  password?: boolean;
};

const UpdateUserField: FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.content}>
        <Typography className={classes.fieldTitle}>{props.label}</Typography>
        <div className={classes.inputAndButton}>
          <CssTextField
            id={props.label}
            type={props.password ? "password" : ""}
            variant={"outlined"}
            defaultValue={props.value}
            InputProps={{ className: classes.input }}
            onChange={(event) => props.setValue(event.target.value)}
          />
          <Button className={classes.updateButton} onClick={props.onSubmit}>
            Update
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateUserField;
