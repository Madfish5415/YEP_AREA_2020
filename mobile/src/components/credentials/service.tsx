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
import { getLocalStorage } from "../../common/localStorage";
import { oAuthLogin } from "../../common/oAuthLogin";

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
  isLoggedIn?: boolean;
  oAuthConfig?: AuthConfiguration;
  serviceName?: string;
  serviceId?: string;
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
  const { navigate } = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {props.isEpitech ? (
        <View>
          <TouchableOpacity
            onPress={() =>
              navigate("EpitechCredentials", {
                screen: "EpitechCredentials",
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
                serviceName: props.name,
                params: { serviceId: props.serviceId },
              })
            }
          >
            <ServiceDescription icon={props.icon} name={props.name} />
          </TouchableOpacity>
          <View style={styles.border} />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() =>
              oAuthLogin(
                props.oAuthConfig as AuthConfiguration,
                props.serviceName as string
              )
            }
          >
            <ServiceDescription icon={props.icon} name={props.name} />
          </TouchableOpacity>
          <View style={styles.border} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Service;
