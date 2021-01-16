import { AppRegistry } from "react-native";

import app from "./app.json";
import App from "./src/app";

AppRegistry.registerComponent(app.name, () => App);
