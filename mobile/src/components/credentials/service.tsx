import React, { FC, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
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
  serviceIconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    color: primary.main,
  },
  serviceIcon: {
    color: primary.main,
  },
  border: {
    borderBottomColor: gray.light1,
    borderBottomWidth: 1,
    marginTop: 10,
  },
});

type Props = {
  name: string;
  icon: React.ReactElement<any>;
  isEpitech: boolean;
  epitechAutoLoginLink?: string;
  setEpitechAutoLoginLink?: (link: string) => void;
  userId: string;
};

type ConfigProps = {
  issuer: string;
  clientID: string;
  redirectURL: string;
  scopes: string[];
};

const Service: FC<Props> = (props) => {
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
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {props.isEpitech ? (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigate("EpitechCredentials", {
                screen: "EpitechCredentials",
                params: { userId: props.userId },
              })
            }
          >
            <View style={styles.service}>
              <View style={styles.description}>
                <View style={styles.serviceIconContainer}>{props.icon}</View>
                <Text style={styles.serviceName}>{props.name}</Text>
              </View>
              <Ionicons
                name={"chevron-forward"}
                size={24}
                color={gray.light1}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.border} />
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => handleClick2()}>
            <View style={styles.service}>
              <View style={styles.description}>
                <View style={styles.serviceIconContainer}>{props.icon}</View>
                <Text style={styles.serviceName}>{props.name}</Text>
              </View>
              <Ionicons
                name={"chevron-forward"}
                size={24}
                color={gray.light1}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.border} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Service;
