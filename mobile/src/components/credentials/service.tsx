import React, { FC } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { primary, gray, white } from "@area-common/styles";
import { AuthConfiguration, authorize } from "react-native-app-auth";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  service: {
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceName: {
    fontSize: 24,
    fontWeight: "bold",
    color: white,
    paddingLeft: 15,
  },
  serviceIcon: {
    fontSize: 50,
    color: primary.main,
  },
  right: {
    fontSize: 15,
    color: gray.light1,
  },
  border: {
    borderBottomColor: gray.light1,
    borderBottomWidth: 1,
    marginTop: 10,
  },
});

type ServiceProps = {
  name: string;
  imageName: string;
};

type ConfigProps = {
  issuer: string;
  clientID: string;
  redirectURL: string;
  scopes: string[];
};

const Service: FC<ServiceProps> = ({ name, imageName }: ServiceProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          alert("Log-in");
        }}
      >
        <View style={styles.service}>
          <View style={styles.description}>
            <Icon style={styles.serviceIcon} name={imageName} />
            <Text style={styles.serviceName}>{name}</Text>
          </View>
          <Icon style={styles.right} name={"chevron-right"} />
        </View>
      </TouchableOpacity>
      <View style={styles.border} />
    </SafeAreaView>
  );
};

export default Service;
