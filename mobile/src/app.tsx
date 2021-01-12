import React, { FC } from "react";
import { registerRootComponent } from "expo";
import HomeScreen from "./screens/home";

const App: FC = () => {
  return <HomeScreen />;
};

export default registerRootComponent(App);
