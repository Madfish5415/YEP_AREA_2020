import React, { FC, useEffect } from "react";
import { StyleSheet, View, Alert, TouchableOpacity, Text } from "react-native";
import { Title } from "../common/title";
import { ItemForm } from "../common/item-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { primary, white } from "@area-common/styles";
import { PrimaryButton } from "../common/primary-button";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 150,
  },
  createAccountContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

type FormValues = {
  email: string;
  password: string;
};

const SignUp: FC = () => {
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
      <View style={{ marginTop: 15 }} />
      <ItemForm
        label={"Password"}
        formId={"password"}
        placeholder={"..."}
        setter={setValue}
      />
      <View style={{ marginTop: 20 }} />
      <PrimaryButton
        label={"Sign In"}
        submitFunction={handleSubmit(onSubmit)}
      />
      <View style={{ marginTop: 15 }} />
      <TouchableOpacity style={styles.createAccountContainer}>
        <Text style={[fonts.main, { color: white }]}>First time?</Text>
        <Text style={[fonts.main, { color: primary.main }]}> Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
