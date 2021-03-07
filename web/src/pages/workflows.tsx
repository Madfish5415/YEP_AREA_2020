import {
  WorkflowBloc,
  WorkflowDeleteEvent,
  WorkflowDeleteState,
  WorkflowErrorState,
  WorkflowListEvent,
  WorkflowListState,
  WorkflowRepository,
  WorkflowState,
  WorkflowUpdateEvent,
  WorkflowUpdateState,
} from "@area-common/blocs";
import { gray, primary, white } from "@area-common/styles";
import { StatusError, Workflow } from "@area-common/types";
import { BlocBuilder } from "@felangel/react-bloc";
import { Fab, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import AppBarComponent from "../components/appbar/appbar";
import { DefaultState } from "../components/blocbuilder/default-state";
import { ErrorState } from "../components/blocbuilder/error-state";
import WorkflowComponent from "../components/workflows/workflow";

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
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent: "center",
  },
  floatingButton: {
    backgroundColor: primary.main,
    color: white,
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed",
  },
}));

const WorkflowsPage: FC = () => {
  const router = useRouter();
  let token = "";
  const workflowsBloc = new WorkflowBloc(
    new WorkflowRepository("http://localhost:8080")
  );
  useEffect(() => {
    const tmp = localStorage.getItem("jwt");
    if (!tmp) {
      router
        .push("/authentication/signin")
        .then()
        .catch((e) => console.log(e));
    } else {
      token = tmp;
      workflowsBloc.add(new WorkflowListEvent(token));
    }
  }, [router]);

  const deleteWorkflow = (workflow: Workflow) => {
    workflowsBloc.add(new WorkflowDeleteEvent(token, workflow.id));
  };

  const isActiveWorkflow = (workflow: Workflow) => {
    workflowsBloc.add(
      new WorkflowUpdateEvent(token, workflow.id, {
        ...workflow,
        active: !workflow.active,
      })
    );
  };

  return (
    <BlocBuilder
      bloc={workflowsBloc}
      key={uuidv4()}
      condition={(_, current: WorkflowState) => {
        if (current instanceof WorkflowDeleteState) {
          workflowsBloc.add(new WorkflowListEvent(token));
        }
        if (current instanceof WorkflowUpdateState) {
          workflowsBloc.add(new WorkflowListEvent(token));
        }
        return true;
      }}
      builder={(state: WorkflowState) => {
        if (state instanceof WorkflowErrorState) {
          return (
            <Workflows
              workflows={(state as WorkflowErrorState).error}
              deleteCallback={deleteWorkflow}
              isActiveCallback={isActiveWorkflow}
            />
          );
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
  workflows: Workflow[] | StatusError;
  deleteCallback: (workflow: Workflow) => void;
  isActiveCallback: (workflow: Workflow) => void;
};

const Workflows: FC<Props> = (props) => {
  const classes = useStyles();
  const router = useRouter();

  const handleNewWorkflow = () => {
    router
      .push({
        pathname: "new/workflow",
      })
      .then()
      .catch((e) => console.log(e));
  };

  let body;

  if (props.workflows instanceof StatusError) {
    body = <ErrorState error={props.workflows} />;
  } else {
    body = (
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
    );
  }

  return (
    <>
      <AppBarComponent />
      <div className={classes.content}>
        <Typography className={classes.title}>My Workflows</Typography>
        {body}
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
