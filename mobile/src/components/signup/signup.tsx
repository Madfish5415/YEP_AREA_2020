import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Title } from "../../common/title";
import { ItemForm } from "../../common/item-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { gray, primary, utils, white } from "@area-common/styles";
import { PrimaryButton } from "../../common/primary-button";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { emailRegex } from "../../constants/regexs";
import { SignUp as SignUpType, StatusError } from "@area-common/types";
import {
  AuthenticationBloc,
  AuthenticationErrorState,
  AuthenticationInitialState,
  AuthenticationLoadingState,
  AuthenticationSignUpEvent,
  AuthenticationSignUpState,
} from "@area-common/blocs/build/blocs/authentication";
import { AuthenticationRepository } from "@area-common/blocs";
import { setLocalStorage } from "../../common/localStorage";
import { BlocBuilder } from "@felangel/react-bloc";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  inner: {
    width: "100%",
    flex: 1,
    paddingBottom: 70,
    justifyContent: "center",
  },
  createAccountContainer: {
    paddingTop: 15,
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
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpScreen: FC = () => {
  const authBloc = new AuthenticationBloc(
    new AuthenticationRepository(globalThis.serverURL)
  );
  const { navigate } = useNavigation();

  const SignUpUser = (signup: SignUpType) => {
    authBloc.add(new AuthenticationSignUpEvent(signup));
  };

  return (
    <BlocBuilder
      bloc={authBloc}
      builder={(state) => {
        if (state instanceof AuthenticationErrorState) {
          return <SignUp callback={SignUpUser} error={state.error} />;
        }
        if (state instanceof AuthenticationInitialState) {
          return <SignUp callback={SignUpUser} />;
        }
        if (state instanceof AuthenticationLoadingState) {
          return <Text>Loading</Text>;
        }
        if (state instanceof AuthenticationSignUpState) {
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
  callback: (signup: SignUpType) => void;
  error?: StatusError;
};

const SignUp: FC<Props> = (props) => {
  const { fonts } = useTheme();
  const { navigate } = useNavigation();
  const [onError, setError] = useState(false);
  const [onErrorEmail, setErrorEmail] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (token !== null) {
      navigate("Home");
    }
  }, [token]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (
      !data?.username ||
      !data?.password ||
      !data?.confirmPassword ||
      !data?.email
    ) {
      setError(true);
      setErrorEmail(false);
    } else if (!emailRegex.test(data.email)) {
      setError(false);
      setErrorEmail(true);
    } else {
      setError(false);
      setErrorEmail(false);
      props.callback({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }
  };

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("username");
    register("firstname");
    register("lastname");
    register("email");
    register("password");
    register("confirmPassword");
  }, [register]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.inner}>
            <Title style={{ marginBottom: 20 }} />
            <Text style={styles.onErrorText}>
              {onError
                ? "One or more fields are empty"
                : onErrorEmail
                ? "Invalid email"
                : props.error
                ? props.error.message
                : null}
            </Text>
            <ItemForm
              label={"Username"}
              formId={"username"}
              placeholder={"JohnDoe"}
              setter={setValue}
              error={onError}
              required={true}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"First Name (optional)"}
              formId={"firstname"}
              placeholder={"John"}
              setter={setValue}
              error={onError}
              required={false}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"Last Name (optional)"}
              formId={"lastname"}
              placeholder={"Doe"}
              setter={setValue}
              error={onError}
              required={false}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"Email"}
              formId={"email"}
              placeholder={"example@gmail.com"}
              setter={setValue}
              error={onError}
              errorEmail={onErrorEmail}
              required={true}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"Password"}
              formId={"password"}
              placeholder={"..."}
              setter={setValue}
              error={onError}
              required={true}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"Confirm Password"}
              formId={"confirmPassword"}
              placeholder={"..."}
              setter={setValue}
              error={onError}
              required={true}
            />
            <PrimaryButton
              style={{ marginTop: 20 }}
              label={"Sign Up"}
              submitFunction={handleSubmit(onSubmit)}
            />
            <TouchableOpacity
              style={styles.createAccountContainer}
              onPress={() => navigate("SignIn")}
            >
              <Text style={[fonts.main, { color: white }]}>
                Already have an account?
              </Text>
              <Text
                style={[
                  fonts.main,
                  { color: primary.main, textDecorationLine: "underline" },
                ]}
              >
                {" "}
                Sign In
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
