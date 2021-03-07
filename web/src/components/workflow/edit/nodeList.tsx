import {CredentialListState} from "@area-common/blocs";
import {gray, white} from "@area-common/styles";
import {SingletonNode} from "@area-common/types";
import {
  createStyles,
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
      maxHeight: 300,
      overflow: "auto",
      flexDirection: "column",
    },
    primary: {
      color: white,
      fontSize: 16,
    },
    secondary: {
      color: gray.light3,
      fontSize: 14,
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
  credentialState: CredentialListState;
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

  return (
    <List className={classes.list}>
      {Array.from(props.nodesTypes).map(([serviceId, nodesTypeList]) =>
        nodesTypeList.map((nodesType) => {
          if (props.credentialState.credentials.find(credential => credential === serviceId) !== undefined || nodesType.credentials !== true) {
            return (
              <ListItem
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
              </ListItem>
            );
          } else {
            return (
              <ListItem
                key={nodesType.id}
                selected={props.singletonNode ? (props.singletonNode[1].id === nodesType.id) : false}
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
                <ListItemIcon>
                  <LockIcon className={classes.icon}/>
                </ListItemIcon>
              </ListItem>
            );
          }
        })
      )}
    </List>
  );
}

export default NodeList;