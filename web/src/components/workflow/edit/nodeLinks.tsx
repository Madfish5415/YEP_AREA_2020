import {gray, primary, secondary, white} from "@area-common/styles";
import {Workflow, WorkflowNode} from "@area-common/types";
import {
  createMuiTheme,
  createStyles,
  FormControl,
  Input,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme, ThemeProvider
} from "@material-ui/core";
import React, {FC} from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      display: "flex",
      width: "80%",
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    background: {
      backgroundColor: gray.main,
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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type Props = {
  workflow: Workflow;
  node: Partial<WorkflowNode>;
  links: string[];
  setLinks: React.Dispatch<React.SetStateAction<string[]>>;
};

const NodeLinks: FC<Props> = (props) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setLinks(event.target.value as string[]);
  };

  return (
    <ThemeProvider theme={theme}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Links</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={props.links}
          onChange={handleChange}
          input={<Input id="select-multiple-chip"/>}
        >
          {props.workflow.nodes.filter((node) => node.id !== props.node.id).map((link) => (
            <MenuItem key={link.name} value={link.id} style={getStyles(link.name, props.links, theme)} className={classes.background}>
              {link.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ThemeProvider>
  );
}

export default NodeLinks;