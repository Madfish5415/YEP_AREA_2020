import React, { FC, useState, useEffect } from "react";
import { makeStyles, Theme, Typography, List, Button } from "@material-ui/core";
import { gray, white, primary } from "@area-common/styles";
import ServiceLine from "./serviceLine";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import ExplicitIcon from "@material-ui/icons/Explicit";
import {
  ServiceBloc,
  ServiceState,
  ServiceEvent,
  ServiceRepository,
  ServiceListEvent,
  ServiceListState,
  ServiceErrorState,
  CredentialBloc,
  CredentialRepository,
  CredentialState,
  CredentialListEvent,
  CredentialErrorState,
  CredentialListState,
} from "@area-common/blocs";
import { useRouter } from "next/router";
import { Service } from "@area-common/types";
import { BlocBuilder } from "@felangel/react-bloc";
import { v4 as uuidv4 } from "uuid";
import { ErrorState } from "../../components/blocbuilder/error-state";
import { DefaultState } from "../blocbuilder/default-state";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { FaDiscord, FaYammer } from "react-icons/fa";
import { SiMicrosoftoutlook, SiGmail } from "react-icons/si";
import { FormatIndentIncreaseOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  content: {},
  icon: {
    color: primary.main,
  },
}));

const ServiceList: FC = () => {
  const router = useRouter();
  let token = "";
  const servicesBloc = new ServiceBloc(
    new ServiceRepository("http://localhost:8080")
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
      servicesBloc.add(new ServiceListEvent());
    }
  });

  return (
    <BlocBuilder
      bloc={servicesBloc}
      key={uuidv4()}
      builder={(state: ServiceState) => {
        if (state instanceof ServiceErrorState) {
          return <ErrorState error={state.error} />;
        }
        if (state instanceof ServiceListState) {
          return <CredentialBlocComponent services={state.services} />;
        }
        return <DefaultState />;
      }}
    />
  );
};

type IntermediateProps = {
  services: Service[];
};

const CredentialBlocComponent: FC<IntermediateProps> = (props) => {
  const router = useRouter();
  let token = "";
  const credentialsBloc = new CredentialBloc(
    new CredentialRepository("http://localhost:8080")
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
      credentialsBloc.add(new CredentialListEvent(token));
    }
  });

  return (
    <BlocBuilder
      bloc={credentialsBloc}
      key={uuidv4()}
      builder={(state: CredentialState) => {
        if (state instanceof CredentialErrorState) {
          return <ErrorState error={state.error} />;
        }
        if (state instanceof CredentialListState) {
          return (
            <ServiceListComponent
              services={props.services}
              credentials={state.credentials}
            />
          );
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  services: Service[];
  credentials: string[];
};

const ServiceListComponent: FC<Props> = (props) => {
  const classes = useStyles();
  const [autologin, setAutologin] = useState("");
  const credentialServices = props.services.filter(
    (service) => service.id !== "conditions"
  );
  const iconMap = new Map([
    ["twitter", <TwitterIcon key={"twitter"} className={classes.icon} />],
    ["github", <GitHubIcon key={"github"} className={classes.icon} />],
    ["epitech", <ExplicitIcon key={"epitech"} className={classes.icon} />],
    ["youtube", <YouTubeIcon key={"youtube"} className={classes.icon} />],
    ["discord", <FaDiscord key={"discord"} className={classes.icon} />],
    [
      "outlook",
      <SiMicrosoftoutlook key={"outlook"} className={classes.icon} />,
    ],
    ["yammer", <FaYammer key={"yammer"} className={classes.icon} />],
    ["gmail", <SiGmail key={"gmail"} className={classes.icon} />],
  ]);

  const findIfRegistered = (serviceId: string) => {
    let registered = false;
    props.credentials.forEach((credential) => {
      if (credential === serviceId) {
        registered = true;
      }
    });
    return registered;
  };

  return (
    <>
      <List>
        {credentialServices.map((service) => {
          return (
            <ServiceLine
              key={service.id}
              serviceId={service.id}
              label={service.name}
              registered={findIfRegistered(service.id)}
              autologin={service.id === "epitech"}
              autologinLink={service.id === "epitech" ? autologin : ""}
              setAutologinLink={
                service.id === "epitech" ? setAutologin : undefined
              }
            >
              {iconMap.get(service.id)}
            </ServiceLine>
          );
        })}
      </List>
    </>
  );
};

export default ServiceList;
