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

const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Share contest with friends link and details */}
        <TouchableOpacity style={styles.shareContestContainer}>
          <Text style={styles.shareContestText}>
            Share this contest with your friends
          </Text>
          <Ionicons name="share-social" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        {/* Details container */}
        <View style={styles.detailsContainer}>
          {/* Prize Details */}
          {/* Winners Detail */}
          <Text></Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  shareContestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shareContestText: {
    fontWeight: "500",
    color: COLORS.light_grey,
    fontSize: 13,
  },
  detailsContainer: {
    marginTop: 20,
    backgroundColor: COLORS.transparentBg,
    padding: 12,
    borderRadius: 5,
  },
});
