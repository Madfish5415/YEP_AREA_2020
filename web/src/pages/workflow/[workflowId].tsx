import {
  WorkflowBloc,
  WorkflowErrorState,
  WorkflowReadEvent,
  WorkflowReadState,
  WorkflowRepository,
  WorkflowState,
  WorkflowUpdateEvent,
  WorkflowUpdateState,
} from "@area-common/blocs";
import {gray, primary} from "@area-common/styles";
import {Workflow} from "@area-common/types";
import {BlocBuilder} from "@felangel/react-bloc";
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import {useRouter} from "next/router";
import React, {FC, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";

import AppBarComponent from "../../components/appbar/appbar";
import {DefaultState} from "../../components/blocbuilder/default-state";
import {ErrorState} from "../../components/blocbuilder/error-state";
import WorkflowConfigDialog from "../../components/workflow/workflowConfigDialog";

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
  const {workflowId} = router.query;
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
          return <ErrorState error={state.error}/>;
        }
        if (state instanceof WorkflowReadState) {
          return (
            <WorkflowEdit
              workflow={(state as WorkflowReadState).workflow}
              changeCallback={handleWorkflowChange}
            />
          );
        }
        return <DefaultState/>;
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

  let name = workflow.name;

  const findBlobId: (id: string) => number = (id) => {
    return parseInt("0x" + id[id.length - 1]) % 10;
  };

  const handleWorkflowNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    name = event.target.value;
  };

  const handleWorkflowChangeSubmit = () => {
    const tmpWorkflow: Workflow = {
      ...workflow,
      name: name
    }

    props.changeCallback(props.workflow.id, tmpWorkflow);
  };

  return (
    <>
      <AppBarComponent/>
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
              InputProps={{className: classes.title}}
              defaultValue={name}
              onChange={handleWorkflowNameChange}
            />
            <Button
              className={classes.saveButton}
              onClick={handleWorkflowChangeSubmit}
            >
              Save
            </Button>
          </div>
          <WorkflowConfigDialog workflow={workflow} setWorkflow={setWorkflow}/>
        </div>
      </Box>
    </>
  );
};

export default WorkflowPage;
