import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { SectionTitle } from "../common/section-title";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AdminBoardScreen: FC = () => {
  return (
    <View style={styles.container}>
      <SectionTitle label={"Users"} style={{ marginTop: 10 }} />
    </View>
  );
};

export default AdminBoardScreen;
