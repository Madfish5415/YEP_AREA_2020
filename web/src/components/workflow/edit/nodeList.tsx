import {
  CredentialBloc,
  CredentialListEvent,
  CredentialListState,
  CredentialRepository,
  CredentialState, ServiceErrorState
} from "@area-common/blocs";
import {gray, white} from "@area-common/styles";
import {SingletonNode} from "@area-common/types";
import {BlocBuilder} from "@felangel/react-bloc";
import {
  createStyles,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
import React, {FC} from "react";
import { v4 as uuidv4 } from "uuid";

import {DefaultState} from "../../blocbuilder/default-state";
import {ErrorState} from "../../blocbuilder/error-state";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
      maxHeight: 300,
      overflow: "auto",
    },
    primary: {
      color: white,
    },
    secondary: {
      color: gray.light3,
    },
    icon: {
      color: gray.light3,
    }
  })
);

type Props = {
  singletonNode: [string, SingletonNode] | null;
  setSingletonNode: React.Dispatch<React.SetStateAction<[string, SingletonNode] | null>>;
  nodesTypes: Map<string, SingletonNode[]>;
};

const NodeList: FC<Props> = (props) => {
  const classes = useStyles();
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string,
  ) => {
    let node: [string, SingletonNode] | null = null;

    props.nodesTypes.forEach((singletonNodeList, serviceId) => {
      const foundedNode: SingletonNode | undefined = singletonNodeList.find((value1 => value1.id === index));

      if (foundedNode)
        node = [serviceId, {...foundedNode}]
    })

    props.setSingletonNode(node);
  };

  const token = localStorage.getItem("jwt");
  const credentialBloc = new CredentialBloc(
    new CredentialRepository("http://localhost:8080")
  );

  if (token)
    credentialBloc.add(new CredentialListEvent(token));

  return (
    <BlocBuilder
      key={uuidv4()}
      bloc={credentialBloc}
      builder={(credentialState: CredentialState) => {
        if (credentialState instanceof ServiceErrorState) {
          return <ErrorState errorLabel={credentialState.error.message}/>;
        }
        if (credentialState instanceof CredentialListState) {
          return (<List className={classes.list}>
            {Array.from(props.nodesTypes).map(([serviceId, nodesTypeList]) =>
              nodesTypeList.map((nodesType) => {
                return (<ListItem
                  key={nodesType.id}
                  button
                  selected={props.singletonNode ? (props.singletonNode[1].id === nodesType.id) : false}
                  onClick={(event) => handleListItemClick(event, nodesType.id)}
                >
                  <ListItemText
                    primary={
                      <Typography className={classes.primary}>
                        {nodesType.name}
                      </Typography>
                    }
                    secondary={
                      <Typography className={classes.secondary}>
                        {nodesType.description}
                      </Typography>
                    }
                  />
                </ListItem>);
                /*
                if (credentialState.credentials.find(credential => credential === serviceId) !== undefined) {
                  return (
                    <ListItem
                      key={nodesType.id}
                      button
                      selected={selectedIndex === nodesType.id}
                      onClick={(event) => handleListItemClick(event, nodesType.id)}
                    >
                      <ListItemText
                        primary={
                          <Typography className={classes.primary}>
                            {nodesType.name}
                          </Typography>
                        }
                        secondary={
                          <Typography className={classes.secondary}>
                            {nodesType.description}
                          </Typography>
                        }
                      />
                    </ListItem>
                  );
                } else {
                  return (
                    <ListItem
                      key={nodesType.id}
                      selected={selectedIndex === nodesType.id}
                    >
                      <ListItemText
                        primary={
                          <Typography className={classes.primary}>
                            nodesType.name
                          </Typography>
                        }
                        secondary={
                          <Typography className={classes.secondary}>
                            nodesType.description
                          </Typography>
                        }
                      />
                      <ListItemIcon>
                        <LockIcon className={classes.icon}/>
                      </ListItemIcon>
                    </ListItem>
                  );
                }*/
              })
            )}
          </List>);
        }
        return <DefaultState/>;
      }}
    />
  )
    ;
}

export default NodeList;