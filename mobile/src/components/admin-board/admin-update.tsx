import React, { FC, useState } from "react";
import { AdminUpdateFieldStackParamList } from "../../screens/admin-update-field";
import { RouteProp } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import { SectionTitle } from "../common/section-title";
import { CustomTextInput } from "../common/text-input";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
});

type AdminUpdateStackRouteProps = RouteProp<
  AdminUpdateFieldStackParamList,
  "AdminUpdateField"
>;

type AdminUpdateProps = {
  route: AdminUpdateStackRouteProps;
};

const AdminUserUpdateScreen: FC<AdminUpdateProps> = (props) => {
  const { label, value, onSubmit } = props.route.params;
  const [text, setText] = useState(value);
  return (
    <View style={styles.container}>
      <SectionTitle label={label} style={{ marginTop: 10 }} />
      <CustomTextInput
        text={value}
        setText={setText}
        onSubmitEditing={(
          event: NativeSyntheticEvent<TextInputSubmitEditingEventData>
        ) => onSubmit(event.nativeEvent.text)}
      />
    </View>
  );
};

export default AdminUserUpdateScreen;
