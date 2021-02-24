import React, { FC, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SettingsStackParamsList } from "../../pages/settings";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  UserBloc,
  UserErrorState,
  UserGetEvent,
  UserGetState,
  UserRepository,
} from "@area-common/blocs";
import { ErrorState } from "../blocbuilder/error-state";
import { DefaultState } from "../blocbuilder/default-state";
import { User } from "@area-common/types";
import { View, StyleSheet } from "react-native";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";
import { StandardButton } from "../common/standard-button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logoutContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

type SettingsRouteProps = RouteProp<SettingsStackParamsList, "Settings">;

type SettingsScreenProps = {
  route: SettingsRouteProps;
};

const SettingsScreen: FC<SettingsScreenProps> = (props) => {
  const userBloc = new UserBloc(new UserRepository(""));
  userBloc.add(new UserGetEvent(props.route.params.userId));

  return (
    <BlocBuilder
      bloc={userBloc}
      builder={(state) => {
        if (state instanceof UserErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof UserGetState) {
          return <Settings user={state.user} />;
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  user: User;
};

const Settings: FC<Props> = (props) => {
  const [username, setUsername] = useState(props.user.username);
  const [firstName, setFirstName] = useState(props.user.username);
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <SectionTitle label={"Username"} style={{ marginTop: 5 }} />
      <CustomTextInput text={props.user.username} setText={setUsername} />
      <SectionTitle label={"First Name"} style={{ marginTop: 20 }} />
      <CustomTextInput text={props.user.firstName} setText={setFirstName} />
      <SectionTitle label={"Last Name"} style={{ marginTop: 20 }} />
      <CustomTextInput text={props.user.lastName} setText={setFirstName} />
      <StandardButton
        label={"Account security"}
        callback={() =>
          navigate("AccountSecurity", {
            screen: "AccountSecurity",
            params: { user: props.user, updateCallback: null },
          })
        }
        important={false}
        style={{ marginTop: 20 }}
      />
      <View style={styles.logoutContainer}>
        <StandardButton label={"Log out"} callback={null} important={true} />
      </View>
    </View>
  );
};

export default SettingsScreen;
