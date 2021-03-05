import React, { FC, useEffect, useState } from "react";
import AppBarComponent from "../components/appbar/appbar";
import WorkflowComponent from "../components/workflows/workflow";
import { makeStyles, Theme, Typography, Grid } from "@material-ui/core";
import { gray } from "@area-common/styles";
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
import { useRouter } from "next/router";

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
          {
            console.log("je vais cabler");
          }
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
    </>
  );
};

export default WorkflowsPage;
