import React, { FC, useState } from "react";
import { User, Account } from "@area-common/types";
import { StyleSheet, View, Text, TouchableOpacity, Switch } from "react-native";
import { gray, white, primary } from "@area-common/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: gray.light2,
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    height: 40,
  },
  nameText: {
    color: white,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});

type Props = {
  user: User;
  account: Account;
  label: string;
  isVerify: boolean;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (value: string | void) => void;
  value?: string;
};

const UpdateUserField: FC<Props> = (props) => {
  const { navigate } = useNavigation();
  const [toggle, setToggle] = useState(props.account.verified);
  return (
    <View style={styles.container}>
      {props.isVerify ? (
        <View style={styles.description}>
          <Text style={styles.nameText}>{props.label}</Text>
          <Switch
            trackColor={{ true: primary.main }}
            style={styles.switch}
            onValueChange={() => {
              setToggle(!toggle);
              props.onSubmit();
            }}
            value={toggle}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={() =>
            navigate("AdminUpdateField", {
              screen: "AdminUpdateField",
              label: props.label,
              params: {
                label: props.label,
                value: props.value,
                onSubmit: props.onSubmit,
              },
            })
          }
          style={styles.description}
        >
          <Text style={styles.nameText}>{props.label}</Text>
          <Ionicons name={"chevron-forward"} size={24} color={gray.light1} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UpdateUserField;
