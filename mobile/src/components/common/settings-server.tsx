import React, { FC, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Modal,
  View,
  Button,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { gray, primary } from "@area-common/styles";
import { CustomTextInput } from "./text-input";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    paddingHorizontal: 15,
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 180,
    width: width * 0.8,
    backgroundColor: gray.main,
    borderRadius: 35,
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
  },
});

const SettingsServer = () => {
  let serverURL = "";

  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(globalThis.serverURL);

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => toggleModalVisibility()}
    >
      <Ionicons name={"settings"} size={24} color={primary.main} />
      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <CustomTextInput text={inputValue} setText={setInputValue} />
            <Button title="Close" onPress={toggleModalVisibility} />
            <Button
              title="Save"
              onPress={() => {
                toggleModalVisibility();
                globalThis.serverURL = inputValue;
              }}
            />
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default SettingsServer;
