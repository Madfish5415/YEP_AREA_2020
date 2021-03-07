import {
  CredentialBloc, CredentialListEvent,
  CredentialListState, CredentialRepository,
  CredentialState,
  ServiceBloc,
  ServiceErrorState,
  ServiceListEvent,
  ServiceListState,
  ServiceRepository,
  ServiceState
} from "@area-common/blocs";
import {gray, primary} from "@area-common/styles";
import {SingletonNode, Workflow, WorkflowNode} from "@area-common/types";
import {BlocBuilder} from "@felangel/react-bloc";
import {
  Box, Button,
  createStyles,
  Dialog, DialogActions,
  DialogContent, IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
  withStyles
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, {FC, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";

import {DefaultState} from "../../blocbuilder/default-state";
import {ErrorState} from "../../blocbuilder/error-state";
import NodeCondition from "./conditionNode";
import NodeLinks from "./nodeLinks";
import NodeList from "./nodeList";
import ParametersItem from "./parametersItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    },
    column: {
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
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
      flexDirection: "column",
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
    addButton: {
      backgroundColor: primary.main,
      color: "white",
      fontSize: 17,
      textTransform: "none",
      height: 40,
      maxWidth: 100,
      minWidth: 100,
      borderRadius: 40 / 2,
      "&:hover": {
        backgroundColor: primary.dark2,
      },
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
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  nodeType: "action" | "reaction" | "other";
  serviceState: ServiceListState;
  credentialState: CredentialListState;
  currentNode?: WorkflowNode;
};

const EditNode: FC<EditNodeProps> = (props) => {
  const classes = useStyles();

  const nodesTypes: Map<string, SingletonNode[]> = new Map<string,
    SingletonNode[]>();

  if (props.serviceState) {
    props.serviceState.services.forEach((service) => {
      const nodes = service.nodes.filter(
        (elem) => {
          if (props.nodeType === "action" || props.nodeType === "reaction") {
            return elem.label === props.nodeType;
          } else {
            return elem.label !== "action" && elem.label !== "reaction";
          }
        }
      );
      nodesTypes.set(service.id, nodes);
    });
  }

  let currentSingletonNode: [string, SingletonNode] | null = null;

  nodesTypes.forEach((singletonNodeList, serviceId) => {
    const foundedNode: SingletonNode | undefined = singletonNodeList.find((value1 => value1.id === props.currentNode?.nodeId));

    if (foundedNode)
      currentSingletonNode = [serviceId, {...foundedNode}];
  })

  const [node, setNode] = useState<Partial<WorkflowNode>>({...props.currentNode} || {
    id: uuidv4(),
    condition: "true",
    nextNodes: []
  });
  const [singletonNode, setSingletonNode] = useState<[string, SingletonNode] | null>(currentSingletonNode);
  const [nodeName, setNodeName] = useState<string | undefined>(props.currentNode?.name || undefined);
  const [nodeParams, setNodeParams] = useState<Record<string, string>>(props.currentNode?.parameters || {});

  useEffect(() => {
    if (!singletonNode)
      return

    setNode({
      ...node,
      serviceId: singletonNode[0],
      nodeId: singletonNode[1].id,
      label: singletonNode[1].label,
      parameters: undefined
    });
    setNodeParams({})

    if (singletonNode === currentSingletonNode) {
      setNode({
        ...node,
        serviceId: singletonNode[0],
        nodeId: singletonNode[1].id,
        label: singletonNode[1].label,
        parameters: props.currentNode?.parameters || undefined
      });
      setNodeParams(props.currentNode?.parameters || {})
    }

  }, [singletonNode])

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
    const newNode: Partial<WorkflowNode> = {
      ...node,
      name: nodeName,
      parameters: nodeParams
    };

    if (!newNode.id || !newNode.serviceId || !newNode.nodeId || !newNode.name || !newNode.label || !newNode.parameters ||
      !newNode.condition || !newNode.nextNodes) {
      return
    }

    const index = newWorkflow.nodes.findIndex((elem) => elem.id === newNode.id);

    if (index !== -1) {
      newWorkflow.nodes.splice(index, 1);
      props.setWorkflow(newWorkflow);
    }

    newWorkflow.nodes.push(newNode as WorkflowNode);
    props.setWorkflow(newWorkflow);

    setNode({
      id: uuidv4(),
      condition: "true",
      nextNodes: [],
    });
    setSingletonNode(null);
    setNodeName(undefined);
    setNodeParams({});
    props.setIsOpen(false);
    props.setRefresh(!props.refresh);
  };

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
          id="nodename"
          name="name"
          margin="normal"
          label=""
          placeholder="Node name"
          InputProps={{className: classes.dialogTitle}}
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
          <Box className={classes.row}>
            <Box className={classes.column}>
              <Typography className={classes.title}>
                Type
              </Typography>
              <NodeList
                nodesTypes={nodesTypes}
                singletonNode={singletonNode}
                setSingletonNode={setSingletonNode}
                credentialState={props.credentialState}
              />
            </Box>
            <Box className={classes.column}>
              <Typography className={classes.title}>
                Parameters
              </Typography>
              <Box className={classes.parameters}>
                {singletonNode && singletonNode[1].parametersDef ? (
                    Object.entries(singletonNode[1].parametersDef).map(([key, value]) => (
                        <ParametersItem
                          key={uuidv4()}
                          params={nodeParams}
                          setParams={setNodeParams}
                          variableKey={key}
                          variable={value}
                        />
                      )
                    )
                  )
                  : null
                }
              </Box>
            </Box>
          </Box>
          <Box className={classes.row}>
            {props.nodeType !== "reaction" ?
              <Box className={classes.column}>
                <Typography className={classes.title}>
                  Links
                </Typography>
                <NodeLinks workflow={props.workflow} node={node}/>
              </Box> : null
            }
            <Box className={classes.column}>
              <Typography className={classes.title}>
                Condition
              </Typography>
              <NodeCondition node={node} setNode={setNode}/>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button className={classes.addButton} onClick={handleUpdate}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type EditNodeBuilderProps = {
  workflow: Workflow;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  nodeType: "action" | "reaction" | "other";
  currentNode?: WorkflowNode;
};

const EditNodeBuilder: FC<EditNodeBuilderProps> = (props) => {
  const serviceBloc = new ServiceBloc(
    new ServiceRepository("http://localhost:8080")
  );
  serviceBloc.add(new ServiceListEvent());

  const token = localStorage.getItem("jwt");
  const credentialBloc = new CredentialBloc(
    new CredentialRepository("http://localhost:8080")
  );

  if (token)
    credentialBloc.add(new CredentialListEvent(token));

  return (
    <BlocBuilder
      key={uuidv4()}
      bloc={serviceBloc}
      builder={(serviceState: ServiceState) => {
        if (serviceState instanceof ServiceErrorState) {
          return <ErrorState error={serviceState.error}/>;
        }
        if (serviceState instanceof ServiceListState) {
          return <BlocBuilder
            key={uuidv4()}
            bloc={credentialBloc}
            builder={(credentialState: CredentialState) => {
              if (credentialState instanceof ServiceErrorState) {
                return <ErrorState error={credentialState.error}/>;
              }
              if (credentialState instanceof CredentialListState) {
                return (<EditNode
                  workflow={props.workflow}
                  setWorkflow={props.setWorkflow}
                  isOpen={props.isOpen}
                  setIsOpen={props.setIsOpen}
                  refresh={props.refresh}
                  setRefresh={props.setRefresh}
                  nodeType={props.nodeType}
                  serviceState={serviceState as ServiceListState}
                  credentialState={credentialState as CredentialListState}
                  currentNode={props.currentNode}
                />);
              }
              return <DefaultState/>;
            }}
          />
        }
        return <DefaultState/>;
      }}
    />
  );
}

export default EditNodeBuilder;