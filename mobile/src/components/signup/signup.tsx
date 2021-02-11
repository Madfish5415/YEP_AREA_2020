import React, { FC, useEffect } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  SafeAreaView,
} from "react-native";
import { Title } from "../../common/title";
import { ItemForm } from "../../common/item-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { gray, primary, white } from "@area-common/styles";
import { PrimaryButton } from "../../common/primary-button";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  inner: {
    width: "100%",
    paddingBottom: 20,
    flex: 1,
    justifyContent: "flex-end",
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

const Signup: FC = () => {
  const { fonts } = useTheme();
  const { navigate } = useNavigation();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    Alert.alert("Data", JSON.stringify(data));
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
          <View style={styles.inner}>
            <Title style={{ marginBottom: 20 }} />
            <ItemForm
              label={"Username"}
              formId={"username"}
              placeholder={"JohnDoe"}
              setter={setValue}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"First Name (optional)"}
              formId={"firstname"}
              placeholder={"John"}
              setter={setValue}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"Last Name (optional)"}
              formId={"lastname"}
              placeholder={"Doe"}
              setter={setValue}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"Email"}
              formId={"email"}
              placeholder={"example@gmail.com"}
              setter={setValue}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"Password"}
              formId={"password"}
              placeholder={"..."}
              setter={setValue}
            />
            <ItemForm
              style={{ marginTop: 10 }}
              label={"Confirm Password"}
              formId={"confirmPassword"}
              placeholder={"..."}
              setter={setValue}
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
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Signup;
