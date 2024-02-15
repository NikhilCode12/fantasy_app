import { StyleSheet, Text, View } from "react-native";
import React from "react";
import COLORS from "../../constants/colors.js";

const PlayerCardsComponent = ({ data }) => {
  return (
    <View style={styles.playerContainer}>
      <Text>{data.name}</Text>
    </View>
  );
};

export default PlayerCardsComponent;
const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.transparentBg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.transparentBg,
  },
});
