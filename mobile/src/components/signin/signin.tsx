import React, { FC, useEffect } from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import { Title } from "../../common/title";
import { ItemForm } from "../../common/item-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { gray, primary, white } from "@area-common/styles";
import { PrimaryButton } from "../../common/primary-button";
import { useTheme } from "react-native-paper";
import { ExternalSignInButton } from "./external-signin-button";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
});

type FormValues = {
  email: string;
  password: string;
};

const SignIn: FC = () => {
  const { fonts } = useTheme();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    Alert.alert("Data", data.email + data.password);
  };

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("email");
    register("password");
  }, [register]);

  return (
    <View style={styles.container}>
      <Title />
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
        onPress={() => alert("todo!")}
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

export default SignIn;
