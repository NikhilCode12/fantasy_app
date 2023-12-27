import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/colors";
import styles from "../../styles/main.style";

const Main = () => {
  return (
    <SafeAreaView>
      <View style={styles.matchesContainer}>
        <View></View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
