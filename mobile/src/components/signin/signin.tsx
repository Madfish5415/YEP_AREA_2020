import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import { Title } from "../../common/title";
import { ItemForm } from "../../common/item-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { gray, primary, utils, white } from "@area-common/styles";
import { PrimaryButton } from "../../common/primary-button";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ExternalSignInButton } from "./external-signin-button";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSignIn } from "../../hooks/authentication/signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const { fonts } = useTheme();
  const { navigate } = useNavigation();
  const { signIn, error } = useSignIn();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("@userToken")
      .then((token) => {
        if (token) {
          navigate("SignUp");
        }
      })
      .catch((e) => console.log(e));
    console.log("Token:", token);
    if (token !== null) {
      navigate("SignUp");
    }
  }, [token]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.email && data.password) {
      await signIn(data.email, data.password);
      try {
        const tokenTmp = await AsyncStorage.getItem("@userToken");
        if (token !== undefined) {
          setToken(tokenTmp);
        }
      } catch (e) {
        alert("Error trying to get token");
      }
    }
  };

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  return (
    <View style={styles.container}>
      <Title />
      {error ? <Text style={styles.onErrorText}>{error.message}</Text> : null}
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
        submitFunction={() => alert("Todo !")}
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
        submitFunction={() => alert("Todo !")}
      />
    </View>
  );
};

export default SignInScreen;
