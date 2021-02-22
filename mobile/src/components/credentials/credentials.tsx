import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";
import Service from "./service";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { primary } from "@area-common/styles";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#262C40",
    marginTop: 10,
  },
  text: {
    fontSize: 50,
    color: primary.main,
    fontWeight: "bold",
  },
});

const CredentialsScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Service
        name={"Instagram"}
        icon={<FontAwesome size={50} name={"instagram"} color={primary.main} />}
        isEpitech={false}
      />
      <Service
        name={"Office 365"}
        icon={
          <MaterialCommunityIcons
            size={50}
            name={"microsoft-office"}
            color={primary.main}
          />
        }
        isEpitech={false}
      />
      <Service
        name={"Github"}
        icon={<FontAwesome size={50} name={"github"} color={primary.main} />}
        isEpitech={false}
      />
      <Service
        name={"Discord"}
        icon={<Fontisto size={50} name={"discord"} color={primary.main} />}
        isEpitech={false}
      />
      <Service
        name={"Youtube"}
        icon={
          <FontAwesome size={50} name={"youtube-play"} color={primary.main} />
        }
        isEpitech={false}
      />
      <Service
        name={"Epitech"}
        icon={<Text style={styles.text}>E</Text>}
        isEpitech={true}
      />
    </View>
  );
};

export default CredentialsScreen;
