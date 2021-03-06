import {SingletonNode, Workflow, WorkflowNode} from "@area-common/types";
import {
  Box,
  createStyles,
  Dialog,
  DialogContent, IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography, WithStyles,
  withStyles
} from "@material-ui/core";
import React, {FC, useEffect, useState} from "react";
import {gray, primary} from "@area-common/styles";
import NodeList from "./nodeList";
import ParametersItem from "./parametersItem";
import {v4 as uuidv4} from "uuid";
import {
  ServiceBloc,
  ServiceErrorState,
  ServiceListEvent,
  ServiceListState,
  ServiceRepository,
  ServiceState
} from "@area-common/blocs";
import {ErrorState} from "../../blocbuilder/error-state";
import {BlocBuilder} from "@felangel/react-bloc";
import {DefaultState} from "../../blocbuilder/default-state";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row"
    },
    column: {
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    title: {
      color: gray.light2,
      fontSize: 25,
      display: "flex",
      justifyContent: "left",
      paddingLeft: "50px",
      width: "100%",
    },
    parameters: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      maxHeight: 300,
      overflow: "auto",
    },
    dialogTitle: {
      fontWeight: "bold",
      fontSize: 30,
      color: primary.main,
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: gray.light2,
    },
  })
);

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

type EditNodeProps = {
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAction: boolean;
  serviceState: ServiceListState;
};

const EditNode: FC<EditNodeProps> = (props) => {
  const classes = useStyles();
  const [node, setNode] = useState<Partial<WorkflowNode>>({
    id: uuidv4()
  });
  const [nodeName, setNodeName] = useState<string | undefined>(undefined);
  const [singletonNode, setSingletonNode] = useState<[string, SingletonNode] | null>(null);

  /*useEffect(() => {
    if (!singletonNode)
      return

    setNode({
      ...node,
      serviceId: singletonNode[0],
      nodeId: singletonNode[1].id,
      label: singletonNode[1].label,
    });
  }, [singletonNode])*/

  const handleClose = () => {
    props.setIsOpen(false);
  };

  const handleNodeNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNodeName(event.target.value);
  };

  const handleUpdate = () => {
    const newWorkflow = props.workflow;

    if (!node.id || !node.serviceId || !node.nodeId || !node.name || !node.label || !node.parameters ||
      !node.condition || !node.nextNodes) {
      return
    }
    if (node.nextNodes.length === 0) {
      return
    }

    newWorkflow.nodes.push(node as WorkflowNode);
    props.setWorkflow(newWorkflow);
    setNode({
      id: uuidv4(),
      serviceId: undefined,
      nodeId: undefined,
      name: undefined,
      label: undefined,
      parameters: undefined,
      condition: undefined,
      nextNodes: undefined
    });
    props.setIsOpen(false);
  };

  const nodesTypes: Map<string, SingletonNode[]> = new Map<string,
    SingletonNode[]>();

  if (props.serviceState) {
    props.serviceState.services.forEach((service) => {
      const nodes = service.nodes.filter(
        (elem) => elem.label === "action" // TODO: be generic
      );
      nodesTypes.set(service.id, nodes);
    });
  }

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth
      maxWidth={"md"}
      open={props.isOpen}
      onClose={handleClose}
      PaperProps={{
        style: {backgroundColor: gray.light1, boxShadow: "1"},
      }}
    >
      <DialogContent>
        <CssTextField
          id="actionName"
          name="name"
          margin="normal"
          label=""
          placeholder="Action name"
          InputProps={{className: classes.dialogTitle}}
          defaultValue={nodeName}
          value={nodeName}
          onChange={handleNodeNameChange}
        />
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon/>
        </IconButton>
        <Box className={classes.container}>
          <Box className={classes.column}>
            <Box className={classes.column}>
              <Typography className={classes.title}>
                Type
              </Typography>
              <NodeList nodesTypes={nodesTypes} singletonNode={singletonNode}
                        setSingletonNode={setSingletonNode}/>
            </Box>
            {props.isAction ?
              <Box className={classes.column}>
                <Typography className={classes.title}>
                  Link
                </Typography>
              </Box> : null
            }
          </Box>
          <Box className={classes.column}>
            <Box className={classes.column}>
              <Typography className={classes.title}>
                Parameters
              </Typography>
              <Box className={classes.parameters}>
                {/*singletonNode && singletonNode[1].parametersDef ? (
                Object.entries(singletonNode[1].parametersDef).map(([key, value]) => (
                  <ParametersItem
                    node={props.node}
                    setNode={props.setNode}
                    key={key}
                    variable={value}
                  />
                )))
              :*/ null
                }
              </Box>
            </Box>
            <Box className={classes.column}>
              <Typography className={classes.title}>
                Condition
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

type EditNodeBuilderProps = {
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAction: boolean;
};

const EditNodeBuilder: FC<EditNodeBuilderProps> = (props) => {
  const serviceBloc = new ServiceBloc(
    new ServiceRepository("http://localhost:8080")
  );
  serviceBloc.add(new ServiceListEvent());

  return (
    <BlocBuilder
      key={uuidv4()}
      bloc={serviceBloc}
      builder={(serviceState: ServiceState) => {
        if (serviceState instanceof ServiceErrorState) {
          return <ErrorState errorLabel={serviceState.error.message}/>;
        }
        if (serviceState instanceof ServiceListState) {
          return <EditNode
            workflow={props.workflow}
            setWorkflow={props.setWorkflow}
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
            isAction={props.isAction}
            serviceState={serviceState as ServiceListState}
          />
        }
        return <DefaultState/>;
      }}
    />
  );
}

export default EditNodeBuilder;