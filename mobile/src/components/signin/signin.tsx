import React, { FC, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Title } from "../../common/title";
import { ItemForm } from "../../common/item-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { gray, primary, utils, white } from "@area-common/styles";
import { PrimaryButton } from "../../common/primary-button";
import { useTheme } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { ExternalSignInButton } from "./external-signin-button";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  AuthenticationBloc,
  AuthenticationErrorState,
  AuthenticationInitialState,
  AuthenticationLoadingState,
  AuthenticationSignInEvent,
  AuthenticationSignInState,
} from "@area-common/blocs/build/blocs/authentication";
import { AuthenticationRepository } from "@area-common/blocs";
import { BlocBuilder } from "@felangel/react-bloc";
import { SignIn as SignInType, StatusError } from "@area-common/types";
import { setLocalStorage } from "../../common/localStorage";
import { oAuthConfigMap } from "../credentials/credentials";
import { AuthConfiguration } from "react-native-app-auth";
import { oAuthSignIn } from "../../common/oAuthLogin";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsServer from "../common/settings-server";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 150,
  },
  createAccountContainer: {
    marginTop: 15,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    marginVertical: 20,
    width: "100%",
    height: 1,
    backgroundColor: gray.light2,
  },
  onErrorText: {
    textAlign: "center",
    color: utils.error,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});

type FormValues = {
  email: string;
  password: string;
};

const SignInScreen: FC = () => {
  const authBloc = new AuthenticationBloc(
    new AuthenticationRepository(globalThis.serverURL)
  );
  const { navigate } = useNavigation();

  const SignInUser = (signin: SignInType) => {
    authBloc.add(new AuthenticationSignInEvent(signin));
  };
  useIsFocused();
  return (
    <BlocBuilder
      key={uuidv4()}
      bloc={authBloc}
      builder={(state) => {
        if (state instanceof AuthenticationErrorState) {
          return <SignIn callback={SignInUser} error={state.error} />;
        }
        if (state instanceof AuthenticationInitialState) {
          return <SignIn callback={SignInUser} />;
        }
        if (state instanceof AuthenticationLoadingState) {
          return <Text>Loading</Text>;
        }
        if (state instanceof AuthenticationSignInState) {
          setLocalStorage("@userToken", state.authentication)
            .then((_) => navigate("Home"))
            .catch((e) => console.log(e));
        }
        return <Text>Loading</Text>;
      }}
    />
  );
};

type Props = {
  callback: (signin: SignInType) => void;
  error?: StatusError;
};

const SignIn: FC<Props> = (props) => {
  const { fonts } = useTheme();
  const { navigate } = useNavigation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.email && data.password) {
      props.callback({ email: data.email, password: data.password });
    }
  };

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  return (
    <SafeAreaView>
      <ScrollView>
        <SettingsServer />
        <View style={styles.container}>
          <Title />
          {props.error ? (
            <Text style={styles.onErrorText}>{props.error.message}</Text>
          ) : null}
          <ItemForm
            label={"Email"}
            formId={"email"}
            placeholder={"example@gmail.com"}
            setter={setValue}
          />
          <ItemForm
            style={{ marginTop: 15 }}
            label={"Password"}
            formId={"password"}
            placeholder={"..."}
            setter={setValue}
          />
          <PrimaryButton
            style={{ marginTop: 20 }}
            label={"Sign In"}
            submitFunction={handleSubmit(onSubmit)}
          />
          <TouchableOpacity
            style={styles.createAccountContainer}
            onPress={() => navigate("SignUp")}
          >
            <Text style={[fonts.main, { color: white }]}>First time?</Text>
            <Text style={[fonts.main, { color: primary.main }]}> Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <ExternalSignInButton
            externalServiceName={"GitHub"}
            externalServiceColor={white}
            externalServiceIcon={
              <AntDesign name="github" size={18} color={white} />
            }
            submitFunction={() => {
              oAuthSignIn(
                oAuthConfigMap.get("github") as AuthConfiguration,
                "github"
              )
                .then(() => navigate("Home"))
                .catch();
            }}
          />
          <ExternalSignInButton
            style={{ marginTop: 15 }}
            externalServiceName={"Office 365"}
            externalServiceColor={"#D53A00"}
            externalServiceIcon={
              <MaterialCommunityIcons
                name="microsoft-office"
                size={18}
                color={"#D53A00"}
              />
            }
            submitFunction={async () => {
              await oAuthSignIn(
                oAuthConfigMap.get("office365") as AuthConfiguration,
                "microsoft"
              )
                .then(() => navigate("Home"))
                .catch();
            }}
          />
          <ExternalSignInButton
            style={{ marginTop: 15 }}
            externalServiceName={"Google"}
            externalServiceColor={white}
            externalServiceIcon={
              <AntDesign name="google" size={18} color={white} />
            }
            submitFunction={() => {
              oAuthSignIn(
                oAuthConfigMap.get("google") as AuthConfiguration,
                "google"
              )
                .then(() => navigate("Home"))
                .catch();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignInScreen;
