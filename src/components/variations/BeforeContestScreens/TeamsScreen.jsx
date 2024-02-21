import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

const TeamsScreen = () => {
  const teams = 20;
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Teams Details Container */}
        <View style={styles.detailsContainer}>
          <View>
            <Text>Joined</Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Text style={styles.teamText}>{teams}</Text>
              <Ionicons name="shirt" size={14} color={COLORS.silver} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TeamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: COLORS.transparentBg,
    padding: 12,
    borderRadius: 5,
  },
  teamText: {
    color: COLORS.light_grey,
    fontSize: 14,
    fontWeight: "bold",
  },
});
