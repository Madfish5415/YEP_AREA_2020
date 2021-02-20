import React, { FC } from "react";
import AppBarComponent from "../components/appbar/appbar";
import { makeStyles, withStyles, TextField, Theme } from "@material-ui/core";
import {
  WorkflowBloc,
  WorkflowDeleteEvent,
  WorkflowDeleteState,
  WorkflowErrorState,
  WorkflowReadEvent,
  WorkflowReadState,
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
import { gray, primary } from "@area-common/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: gray.main,
    height: "100%",
  },
  nameForm: {
    marginLeft: 125,
    marginTop: 40,
  },
  title: {
    color: primary.main,
    fontSize: 30,
    textDecoration: "underline",
    textUnderlinePosition: "under",
  },
}));

const WorkflowPage: FC = () => {
  const router = useRouter();
  const workflowBloc = new WorkflowBloc(new WorkflowRepository(""));
  workflowBloc.add(new WorkflowReadEvent(router.query.id as string));

  return (
    <BlocBuilder
      bloc={workflowBloc}
      key={uuidv4()}
      condition={(_, current: WorkflowState) => {
        if (current instanceof WorkflowUpdateEvent) {
          workflowBloc.add(new WorkflowReadEvent(router.query.id as string));
        }
        return true;
      }}
      builder={(state: WorkflowState) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof WorkflowReadState) {
          return (
            <WorkflowEdit workflow={(state as WorkflowReadState).workflow} />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

const CssTextField = withStyles({
  root: {
    "& .MuiInput-underline:before": {
      borderBottomColor: primary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: primary.main,
    },
  },
})(TextField);

type Props = {
  workflow: Workflow;
};

const WorkflowEdit: FC<Props> = (props) => {
  const classes = useStyles();

  const findBlobId: (id: string) => number = (id) => {
    console.log(parseInt("0x" + id[id.length - 1]) % 10);
    return parseInt("0x" + id[id.length - 1]) % 10;
  };

  const handleWorkflowNameChange = () => {
    console.log("plops");
  };

  return (
    <>
      <AppBarComponent />
      <div
        className={classes.root}
        style={{
          background:
            "url(/assets/images/blob" +
            findBlobId(props.workflow.id) +
            "_bg.svg) no-repeat center",
          backgroundSize: "75%",
        }}
      >
        <form autoComplete="off">
          <CssTextField
            id="workflowName"
            name="name"
            margin="normal"
            label=""
            className={classes.nameForm}
            InputProps={{ className: classes.title }}
            value={props.workflow.name}
            onChange={handleWorkflowNameChange}
          />
        </form>
      </div>
    </>
  );
};

export default WorkflowPage;
