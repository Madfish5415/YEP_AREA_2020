const fs = require("fs");
const path = require("path");

const localNMPath = path.resolve(__dirname, "./node_modules");
const rootNMPath = path.resolve(__dirname, "../node_modules");

/* Required */
const reactNative = "react-native";
const hermesEngine = "hermes-engine";
const jscAndroid = "jsc-android";
const cliPlatformAndroid = "@react-native-community/cli-platform-android";
const cliPlatformIOS = "@react-native-community/cli-platform-ios";

symlink(path.join(rootNMPath, reactNative), path.join(localNMPath, reactNative));
symlink(path.join(rootNMPath, hermesEngine), path.join(localNMPath, hermesEngine));
symlink(path.join(rootNMPath, jscAndroid), path.join(localNMPath, jscAndroid));
symlink(path.join(rootNMPath, cliPlatformAndroid), path.join(localNMPath, cliPlatformAndroid));
symlink(path.join(rootNMPath, cliPlatformIOS), path.join(localNMPath, cliPlatformIOS));

/* Additional */
const vectorIcons = "react-native-vector-icons";

symlink(path.join(rootNMPath, vectorIcons), path.join(localNMPath, vectorIcons));

/* Functions */

function symlink(source, target) {
  const targetParent = target.slice(0, target.lastIndexOf("/"));

  if (!fs.existsSync(targetParent)) {
    fs.mkdirSync(targetParent);
  }

  if (!fs.existsSync(target)) {
    fs.symlinkSync(source, target);
  }
}
