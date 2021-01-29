import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Credentials from "../components/credentials/credentials";

const Stack = createStackNavigator();

const CredentialsScreen: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Credentials"} component={Credentials} />
    </Stack.Navigator>
  );
};

export default CredentialsScreen;
