import React, { FC, useState } from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  Typography,
  Grid,
  TextField,
} from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    color: gray.light3,
    fontSize: 20,
  },
}));

const CssTextField = withStyles({
  root: {
    marginTop: 5,
    backgroundColor: gray.light1,
    borderRadius: 10,
    height: 35,
    width: 450,
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
  value: string;
  onSubmit?: (newValue: string) => void;
  disabled?: boolean;
  password?: boolean;
};

const SettingsTextInput: FC<Props> = (props) => {
  const classes = useStyles();
  const [input, setInput] = useState(props.value);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!props.disabled) {
      props.onSubmit!(input);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <CssTextField
          id={"username"}
          disabled={props.disabled}
          type={props.password ? "password" : ""}
          variant={"outlined"}
          defaultValue={props.value}
          InputProps={{ className: classes.input }}
          onChange={(event) => setInput(event.target.value)}
        />
      </form>
    </>
  );
};

export default SettingsTextInput;
