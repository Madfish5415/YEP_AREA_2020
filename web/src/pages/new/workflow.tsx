import React, { FC, useState, useEffect } from "react";
import AppBarComponent from "../../components/appbar/appbar";
import {
  makeStyles,
  withStyles,
  Theme,
  TextField,
  Typography,
  Grid,
  Fab,
} from "@material-ui/core";
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
  WorkflowCreateState,
  WorkflowCreateEvent,
} from "@area-common/blocs";
import { DefaultState } from "../../components/blocbuilder/default-state";
import { ErrorState } from "../../components/blocbuilder/error-state";
import { gray, primary } from "@area-common/styles";
import { v4 as uuidv4 } from "uuid";
import { Workflow } from "@area-common/types";
import WorkflowConfig from "../../components/workflow/workflowConfig";
import Router, { useRouter } from "next/router";
import { BlocBuilder } from "@felangel/react-bloc";

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
  saveButton: {
    backgroundColor: primary.main,
    fontWeight: "bold",
    margin: "0px",
    top: "auto",
    right: "20px",
    bottom: "20px",
    left: "auto",
    position: "fixed",
  },
}));

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

const NewWorkflowPage: FC = () => {
  const router = useRouter();
  let token = "";
  const workflowBloc = new WorkflowBloc(
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
    }
  });

  const handleWorkflowSubmit = (workflow: Workflow) => {
    workflowBloc.add(new WorkflowCreateEvent(token, workflow));
  };

  return (
    <BlocBuilder
      bloc={workflowBloc}
      key={uuidv4()}
      condition={(_, current: WorkflowState) => {
        if (current instanceof WorkflowCreateState) {
          Router.push({
            pathname: "/workflows",
          });
        }
        return true;
      }}
      builder={(state: WorkflowState) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        return <NewWorkflow createCallback={handleWorkflowSubmit} />;
      }}
    />
  );
};

type Props = {
  createCallback: (workflow: Workflow) => void;
};

const NewWorkflow: FC<Props> = (props) => {
  const classes = useStyles();
  const [newWorkflow, setNewWorkflow] = useState<Workflow>({
    userId: uuidv4(),
    id: uuidv4(),
    name: "",
    description: "",
    active: false,
    nodes: [],
    starters: [],
  });

  const findBlobId: (id: string) => number = (id) => {
    return parseInt("0x" + id[id.length - 1]) % 10;
  };

  const handleWorkflowNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewWorkflow({ ...newWorkflow, name: event.target.value });
  };

  return (
    <>
      <AppBarComponent />
      <div
        className={classes.root}
        style={{
          background:
            "url(/assets/images/blob" +
            findBlobId(newWorkflow.id) +
            "_bg.svg) no-repeat center",
          backgroundSize: "75%",
        }}
      >
        <CssTextField
          id="workflowName"
          name="name"
          margin="normal"
          label=""
          placeholder="Workflow name"
          className={classes.nameForm}
          InputProps={{ className: classes.title }}
          defaultValue={newWorkflow.name}
          onChange={handleWorkflowNameChange}
        />
        <WorkflowConfig workflow={newWorkflow} setWorkflow={setNewWorkflow} />
        <Fab
          variant={"extended"}
          className={classes.saveButton}
          onClick={() => props.createCallback(newWorkflow)}
        >
          Create workflow
        </Fab>
      </div>
    </>
  );
};

export default NewWorkflowPage;
