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
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: gray.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: gray.main,
      },
      "&:hover fieldset": {
        borderColor: gray.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: gray.main,
      },
    },
  },
})(TextField);

type Props = {
  value: string;
  onSubmit: (newValue: string) => void;
};

const SettingsTextInput: FC<Props> = (props) => {
  const classes = useStyles();
  const [input, setInput] = useState(props.value);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit(input);
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <CssTextField
          id={"username"}
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
