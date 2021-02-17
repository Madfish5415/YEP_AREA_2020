import React, { FC } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { primary, gray, white } from "@area-common/styles";
import { authorize } from "react-native-app-auth";

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
  const handleClick = async () => {
    Linking.openURL(
      "https://accounts.google.com/o/oauth2/v2/auth?" +
        "scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly" +
        "&access_type=offline&" +
        "include_granted_scopes=true" +
        "&response_type=code" +
        "&state=state_parameter_passthrough_value" +
        "&redirect_uri=http://localhost:8081/" +
        "&client_id=627450745253-3u76amqao7hk28lfnfrip3c4u8be0krt.apps.googleusercontent.com"
    );
  };

  const handleClick2 = async () => {
    const config = {
      issuer: "http://localhost:8081/",
      clientId:
        "627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal.apps.googleusercontent.com",
      redirectUrl:
        "com.googleusercontent.apps.627450745253-6vmsbn8e4197u7s6vhv3idd03f6t6jal",
      scopes: ["https://www.googleapis.com/auth/youtube"],
      serviceConfiguration: {
        authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth?",
      },
    };
    try {
      const result = await authorize(config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => handleClick2()}>
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
