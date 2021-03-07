import {gray, primary, secondary, white} from "@area-common/styles";
import {WorkflowNode} from "@area-common/types";
import {Box, createMuiTheme, createStyles, makeStyles, TextField, Theme, ThemeProvider} from "@material-ui/core";
import React, {FC} from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      width: "70%",
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
  node: Partial<WorkflowNode>;
  setNode: React.Dispatch<React.SetStateAction<Partial<WorkflowNode>>>;
};

const NodeCondition: FC<Props> = (props) => {
  const classes = useStyles();

  const handleParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setNode({
      ...props.node,
      condition: event.target.value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.container}>
        <TextField
          required
          id="condition"
          name="condition"
          variant="outlined"
          fullWidth
          value={props.node.condition || "true"}
          onChange={handleParameterChange}
          color={"primary"}
          margin={"dense"}
        />
      </Box>
    </ThemeProvider>
  );
}

export default NodeCondition;