import React, { FC, useState, useEffect } from "react";
import AppBarComponent from "../../components/appbar/appbar";
import {
  makeStyles,
  withStyles,
  TextField,
  Theme,
  Fab,
  Typography,
  Button,
  Box,
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
} from "@area-common/blocs";
import { DefaultState } from "../../components/blocbuilder/default-state";
import { ErrorState } from "../../components/blocbuilder/error-state";
import WorkflowConfig from "../../components/workflow/workflowConfig";
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
  titleAndSave: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saveButton: {
    marginTop: 40,
    marginRight: 30,
    backgroundColor: primary.main,
    color: "white",
    fontSize: 15,
    textTransform: "none",
    height: 50,
    maxWidth: 75,
    minWidth: 75,
    borderRadius: 50 / 2,
    "&:hover": {
      backgroundColor: primary.dark2,
    },
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
  let token = "";
  const { workflowId } = router.query;
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
      workflowBloc.add(new WorkflowReadEvent(token, workflowId as string));
    }
  }, [router]);

  const handleWorkflowChange = (
    workflowId: string,
    updateWorkflow: Partial<Workflow>
  ) => {
    workflowBloc.add(
      new WorkflowUpdateEvent(token, workflowId, updateWorkflow)
    );
  };

  return (
    <BlocBuilder
      bloc={workflowBloc}
      key={uuidv4()}
      condition={(_, current: WorkflowState) => {
        if (current instanceof WorkflowUpdateState) {
          workflowBloc.add(new WorkflowReadEvent(token, workflowId as string));
        }
        return true;
      }}
      builder={(state: WorkflowState) => {
        if (state instanceof WorkflowErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof WorkflowReadState) {
          return (
            <WorkflowEdit
              workflow={(state as WorkflowReadState).workflow}
              changeCallback={handleWorkflowChange}
            />
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
  changeCallback: (
    workflowId: string,
    updateWorkflow: Partial<Workflow>
  ) => void;
};

const WorkflowEdit: FC<Props> = (props) => {
  const classes = useStyles();
  const [workflow, setWorkflow] = useState(props.workflow);

  const findBlobId: (id: string) => number = (id) => {
    return parseInt("0x" + id[id.length - 1]) % 10;
  };

  const handleWorkflowNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorkflow({ ...workflow, name: event.target.value });
  };

  const handleWorkflowChangeSubmit = () => {
    props.changeCallback(props.workflow.id, workflow);
  };

  return (
    <>
      <AppBarComponent />
      <Box mb={5}>
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
          <div className={classes.titleAndSave}>
            <CssTextField
              id="workflowName"
              name="name"
              margin="normal"
              label=""
              className={classes.nameForm}
              InputProps={{ className: classes.title }}
              defaultValue={props.workflow.name}
              onChange={handleWorkflowNameChange}
            />
            <Button
              className={classes.saveButton}
              onClick={handleWorkflowChangeSubmit}
            >
              Save
            </Button>
          </div>
          <WorkflowConfig workflow={workflow} setWorkflow={setWorkflow} />
        </div>
      </Box>
    </>
  );
};

export default WorkflowPage;
