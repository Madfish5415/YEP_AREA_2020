import React, { FC } from "react";
import { User } from "@area-common/types";
import { View, Text, StyleSheet } from "react-native";
import { gray, white } from "@area-common/styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
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
});

type Props = {
  user: User;
  updateUser: (id: string, updatedUser: Partial<User>) => void;
  deleteUser: (id: string) => void;
};

const UserList: FC<Props> = (props) => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          navigate("AdminUserManage", {
            screen: "AdminUserManage",
            user: props.user,
            params: {
              user: props.user,
              updateUser: props.updateUser,
              deleteUser: props.deleteUser,
            },
          })
        }
        style={styles.description}
      >
        <Text style={styles.nameText}>{props.user.username}</Text>
        <Ionicons name={"chevron-forward"} size={24} color={gray.light1} />
      </TouchableOpacity>
    </View>
  );
};

export default UserList;
