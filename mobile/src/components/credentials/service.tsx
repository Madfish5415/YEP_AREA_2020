import React, { FC } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { primary, gray, white } from "@area-common/styles";
import { AuthConfiguration, authorize } from "react-native-app-auth";
import { User } from "@area-common/types";
import { ConfigProps } from "./credentials";

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
  user: User;
  isLoggedIn?: boolean;
  oAuthConfig?: AuthConfiguration;
};

type ServiceDescriptionProps = {
  icon: React.ReactElement<any>;
  name: string;
};

const ServiceDescription: FC<ServiceDescriptionProps> = (props) => {
  return (
    <View style={styles.service}>
      <View style={styles.description}>
        <View style={styles.serviceIconContainer}>{props.icon}</View>
        <Text style={styles.serviceName}>{props.name}</Text>
      </View>
      <Ionicons name={"chevron-forward"} size={24} color={gray.light1} />
    </View>
  );
};

const Service: FC<Props> = (props) => {
  const connectWithOauth = async (oAuthConfig: AuthConfiguration) => {
    try {
      const result = await authorize(oAuthConfig);
      console.log(result);
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
                params: { userId: props.user.id },
              })
            }
          >
            <ServiceDescription icon={props.icon} name={props.name} />
          </TouchableOpacity>
          <View style={styles.border} />
        </View>
      ) : props.isLoggedIn ? (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigate("OAuthCredentials", {
                screen: "OAuthCredentials",
                params: { userId: props.user.id },
                serviceName: props.name,
              })
            }
          >
            <ServiceDescription icon={props.icon} name={props.name} />
          </TouchableOpacity>
          <View style={styles.border} />
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => connectWithOauth(props.oAuthConfig)}>
            <ServiceDescription icon={props.icon} name={props.name} />
          </TouchableOpacity>
          <View style={styles.border} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Service;
