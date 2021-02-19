import React, { FC } from "react";
import AppBarComponent from "../components/appbar/appbar";
import WorkflowComponent from "../components/workflows/workflow";
import { makeStyles, Theme, Typography, Grid, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { gray, primary } from "@area-common/styles";
import {
  WorkflowBloc,
  WorkflowDeleteEvent,
  WorkflowDeleteState,
  WorkflowErrorState,
  WorkflowListEvent,
  WorkflowListState,
  WorkflowUpdateEvent,
  WorkflowUpdateState,
  WorkflowRepository,
  WorkflowState,
} from "@area-common/blocs";
import { DefaultState } from "../components/blocbuilder/default-state";
import { ErrorState } from "../components/blocbuilder/error-state";
import { Workflow } from "@area-common/types";
import { BlocBuilder } from "@felangel/react-bloc";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    backgroundColor: gray.main,
  },
  title: {
    marginLeft: 125,
    marginTop: 40,
    color: gray.light2,
    fontSize: 30,
    textDecoration: "underline",
    textUnderlinePosition: "under",
  },
  workflows: {
    marginTop: 25,
    justifyContent: "center",
  },
  floatingButton: {
    backgroundColor: primary.main,
    color: gray.main,
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed",
  },
}));

const WorkflowsPage: FC = () => {
  const workflowsBloc = new WorkflowBloc(new WorkflowRepository(""));
  workflowsBloc.add(new WorkflowListEvent());

  const deleteWorkflow = (workflow: Workflow) => {
    workflowsBloc.add(new WorkflowDeleteEvent(workflow.id));
  };

  const isActiveWorkflow = (workflow: Workflow) => {
    workflowsBloc.add(
      new WorkflowUpdateEvent(workflow.id, {
        isActive: workflow.isActive ? false : true,
      })
    );
  };

  return (
    <BlocBuilder
      bloc={workflowsBloc}
      key={uuidv4()}
      condition={(_, current: WorkflowState) => {
        if (current instanceof WorkflowDeleteState) {
          workflowsBloc.add(new WorkflowListEvent());
        }
        if (current instanceof WorkflowUpdateState) {
          workflowsBloc.add(new WorkflowListEvent());
        }
        return true;
      }}
      builder={(state: WorkflowState) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof WorkflowListState) {
          return (
            <Workflows
              workflows={(state as WorkflowListState).workflows}
              deleteCallback={deleteWorkflow}
              isActiveCallback={isActiveWorkflow}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  workflows: Workflow[];
  deleteCallback: (workflow: Workflow) => void;
  isActiveCallback: (workflow: Workflow) => void;
};

const Workflows: FC<Props> = (props) => {
  const classes = useStyles();

  const handleNewWorkflow = () => {
    console.log("create new workflow");
  };

  return (
    <>
      <AppBarComponent />
      <div className={classes.content}>
        <Typography className={classes.title}>My Workflows</Typography>
        <Grid container spacing={5} className={classes.workflows}>
          {props.workflows.map((workflow) => (
            <Grid item key={workflow.id}>
              <WorkflowComponent
                workflow={workflow}
                deleteCallback={props.deleteCallback}
                isActiveCallback={props.isActiveCallback}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Fab
        color="inherit"
        className={classes.floatingButton}
        onClick={handleNewWorkflow}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default WorkflowsPage;
