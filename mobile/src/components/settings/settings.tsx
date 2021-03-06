import React, { FC, useEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SettingsStackParamsList } from "../../pages/settings";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  AuthenticationBloc,
  UserBloc,
  UserErrorState,
  UserReadEvent,
  UserReadState,
  UserRepository,
  UserUpdateEvent,
  UserInitialState,
  UserLoadingState,
} from "@area-common/blocs";
import { ErrorState } from "../blocbuilder/error-state";
import { DefaultState } from "../blocbuilder/default-state";
import { User } from "@area-common/types";
import {
  View,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";
import { StandardButton } from "../common/standard-button";
import { getLocalStorage } from "../../common/localStorage";
import { Text } from "react-native";

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

const SettingsScreen: FC = () => {
  const userBloc = new UserBloc(new UserRepository("http://localhost:8080"));
  const { navigate } = useNavigation();

  getLocalStorage("@userToken")
    .then((userToken) => {
      if (userToken) {
        userBloc.add(new UserReadEvent(userToken));
      } else {
        navigate("SignIn");
      }
    })
    .catch((error) => console.log(error));

  const updateUserInfos = (user: User, updatedUser: Partial<User>) => {
    getLocalStorage("@userToken")
      .then((data) => {
        if (data) {
          userBloc.add(new UserUpdateEvent(data, updatedUser));
          userBloc.add(new UserReadEvent(data));
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <BlocBuilder
      bloc={userBloc}
      builder={(state) => {
        if (state instanceof UserInitialState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof UserLoadingState) {
          return <Text>Fuck</Text>;
        }
        if (state instanceof UserErrorState) {
          return <ErrorState errorLabel={"An error has occured"} />;
        }
        if (state instanceof UserReadState) {
          return <Settings user={state.user} update={updateUserInfos} />;
        }
        return <DefaultState />;
      }}
    />
  );
};

type Props = {
  user: User;
  update: (user: User, updatedUser: Partial<User>) => void;
};

const Settings: FC<Props> = (props) => {
  const [username, setUsername] = useState(props.user.username);
  const [firstName, setFirstName] = useState(props.user.username);
  const [lastName, setLastName] = useState(props.user.username);
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <SectionTitle label={"Username"} style={{ marginTop: 5 }} />
      <CustomTextInput
        text={props.user.username}
        setText={setUsername}
        onSubmitEditing={(
          event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
        ) => props.update(props.user, { username: event.nativeEvent.text })}
      />
      <SectionTitle label={"First Name"} style={{ marginTop: 20 }} />
      <CustomTextInput
        text={props.user.firstName}
        setText={setFirstName}
        onSubmitEditing={(
          event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
        ) => props.update(props.user, { firstName: event.nativeEvent.text })}
      />
      <SectionTitle label={"Last Name"} style={{ marginTop: 20 }} />
      <CustomTextInput
        text={props.user.lastName}
        setText={setLastName}
        onSubmitEditing={(
          event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
        ) => props.update(props.user, { lastName: event.nativeEvent.text })}
      />
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
        <StandardButton
          label={"Admin board"}
          callback={() => navigate("AdminBoard", { screen: "AdminBoard" })}
          important={true}
          style={{ marginBottom: 20 }}
        />
        <StandardButton label={"Log out"} callback={null} important={true} />
      </View>
    </View>
  );
};

export default SettingsScreen;
