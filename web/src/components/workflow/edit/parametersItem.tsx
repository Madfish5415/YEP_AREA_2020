import {gray, primary, secondary, white} from "@area-common/styles";
import {Variable} from "@area-common/types";
import {
  Box,
  createMuiTheme,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  ThemeProvider,
  Typography
} from "@material-ui/core";
import React, {FC} from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    },
    row: {
      display: "flex",
      flexGrow: 1,
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    name: {
      color: white,
      fontSize: 16,
      display: "flex",
      justifyContent: "left",
      width: "100%",
      height: "100%",
    },
    type: {
      color: gray.light3,
      fontSize: 14,
      display: "flex",
      justifyContent: "right",
      width: "100%",
      height: "100%",
    },
    description: {
      color: gray.light3,
      fontSize: 14,
      display: "flex",
      justifyContent: "left",
      width: "100%",
      height: "100%",
    },
  })
);

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: primary.main,
      contrastText: white
    },
    secondary: {
      main: secondary.main,
    },
    grey: {
      50: gray.main,
      100: gray.light1,
      200: gray.light2,
      300: gray.light3,
      400: gray.light4,
      500: gray.light5,
    },
  },
});

type Props = {
  params: Record<string, string>;
  setParams: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  variableKey: string;
  variable: Variable;
};

const ParametersItem: FC<Props> = (props) => {
  const classes = useStyles();

  const handleParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newParameters = props.params;

    newParameters[props.variableKey] = event.target.value;

    props.setParams(newParameters);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.container}>
        <Box className={classes.row}>
          <Typography className={classes.name}>
            {props.variable.name}
          </Typography>
          <Typography className={classes.type}>
            {props.variable.type}
          </Typography>
        </Box>
        <Typography className={classes.description}>
          {props.variable.description}
        </Typography>
        <TextField
          required
          id={props.variableKey}
          name={props.variable.name}
          variant="outlined"
          fullWidth
          defaultValue={props.params[props.variableKey]}
          onChange={handleParameterChange}
          color={"primary"}
          margin={"dense"}
        />
      </Box>
    </ThemeProvider>
  );
}

export default ParametersItem;