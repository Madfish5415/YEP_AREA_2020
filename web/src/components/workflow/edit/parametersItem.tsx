import React, {FC} from "react";
import {Variable, WorkflowNode} from "@area-common/types";
import {Box, createStyles, makeStyles, TextField, Theme, Typography} from "@material-ui/core";
import {gray, white} from "@area-common/styles";

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
    },
    type: {
      color: gray.light3,
    },
    description: {
      display: "flex",
      width: "100%",
      height: "100%",
      color: gray.light3,
    },
  })
);

type Props = {
  node: Partial<WorkflowNode>;
  setNode: React.Dispatch<React.SetStateAction<Partial<WorkflowNode>>>;
  key: string;
  variable: Variable;
};

const ParametersItem: FC<Props> = (props) => {
  const classes = useStyles();

  const handleParameterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newParameters: Record<string, string> | undefined = props.node.parameters;

    if (!newParameters)
      newParameters = {}

    newParameters[props.key] = event.target.value;


    props.setNode({
      ...props.node,
      parameters: newParameters,
    });
  };

  return (
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
        id={props.key}
        name="username"
        autoFocus
        variant="outlined"
        fullWidth
        onSubmit={handleParameterChange}
        color={"primary"}
        margin={"dense"}
      />
    </Box>
  );
}

export default ParametersItem;