import {
  UserBloc,
  UserErrorState,
  UserReadEvent,
  UserReadState,
  UserRepository,
  UserState,
  WorkflowBloc,
  WorkflowCreateEvent,
  WorkflowCreateState,
  WorkflowErrorState,
  WorkflowRepository,
  WorkflowState
} from "@area-common/blocs";
import {gray, primary} from "@area-common/styles";
import {User,Workflow} from "@area-common/types";
import {BlocBuilder} from "@felangel/react-bloc";
import {
  Button,
  makeStyles,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import Router, {useRouter} from "next/router";
import React, {FC, useEffect,useState} from "react";
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
  titleAndCreate: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createButton: {
    marginTop: 40,
    marginRight: 30,
    backgroundColor: primary.main,
    color: "white",
    fontSize: 19,
    textTransform: "none",
    height: 50,
    maxWidth: 185,
    minWidth: 185,
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
          return <ErrorState error={state.error}/>;
        }
        return <UserBlocComponent createCallback={handleWorkflowSubmit}/>;
      }}
    />
  );
};

type IntermediateProps = {
  createCallback: (workflow: Workflow) => void;
};

const UserBlocComponent: FC<IntermediateProps> = (props) => {
  const router = useRouter();
  let token = "";
  const userBloc = new UserBloc(new UserRepository("http://localhost:8080"));
  useEffect(() => {
    const tmp = localStorage.getItem("jwt");
    if (!tmp) {
      router
        .push("/authentication/signin")
        .then()
        .catch((e) => console.log(e));
    } else {
      token = tmp;
      userBloc.add(new UserReadEvent(token));
    }
  });

  return (
    <BlocBuilder
      bloc={userBloc}
      key={uuidv4()}
      builder={(state: UserState) => {
        if (state instanceof UserErrorState) {
          return <ErrorState error={state.error}/>;
        }
        if (state instanceof UserReadState) {
          return (
            <NewWorkflow
              user={(state as UserReadState).user}
              createCallback={props.createCallback}
            />
          );
        }
        return <DefaultState/>;
      }}
    />
  );
};

type Props = {
  user: User;
  createCallback: (workflow: Workflow) => void;
};

const NewWorkflow: FC<Props> = (props) => {
  const classes = useStyles();
  const [newWorkflow, setNewWorkflow] = useState<Workflow>({
    userId: props.user.id,
    id: uuidv4(),
    name: "",
    description: "A description",
    active: false,
    nodes: [],
    starters: [],
  });
  let name = "Default Name";

  useEffect(() => {
    console.log("Workflow: " + JSON.stringify(newWorkflow));
  }, [newWorkflow])

  const findBlobId: (id: string) => number = (id) => {
    return parseInt("0x" + id[id.length - 1]) % 10;
  };

  const handleWorkflowNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    name = event.target.value;
  };

  return (
    <>
      <AppBarComponent/>
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
        <div className={classes.titleAndCreate}>
          <CssTextField
            id="workflowName"
            name="name"
            margin="normal"
            label=""
            placeholder="Workflow name"
            className={classes.nameForm}
            InputProps={{className: classes.title}}
            defaultValue={name}
            onChange={handleWorkflowNameChange}
          />
          <Button
            className={classes.createButton}
            onClick={() => {
              const tmpWorkflow: Workflow = {
                ...newWorkflow,
                name: name,
                starters: newWorkflow.nodes.filter((node) => node.label === "action").map((node) => node.id),
              }

              console.log("Workflow: " + JSON.stringify(tmpWorkflow));

              props.createCallback(tmpWorkflow);
            }}
          >
            Create workflow
          </Button>
        </div>
        <WorkflowConfigDialog workflow={newWorkflow} setWorkflow={setNewWorkflow}/>
      </div>
    </>
  );
};

export default NewWorkflowPage;
