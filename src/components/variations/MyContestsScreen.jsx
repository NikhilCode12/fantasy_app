import React from "react";
import COLORS from "../../constants/colors";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ContestsScreen from "./ContestsScreen";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import picc from "../../../assets/batsmenPic.jpg";
export default function MyContestsScreen({ route }) {
  const navigation = useNavigation();
  const { data, amount, variation } = route.params;
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.bgMateBlack, flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.navigate("VariationsScreen", { data: data });
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Contests</Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 15,
            color: COLORS.light_grey,
            paddingHorizontal: 25,
          }}
        >
          You haven't Joined any Upcoming Contests
        </Text>
      </View>
      <View>
        <Image
          source={picc}
          style={{
            height: 150,
            width: 150,
            marginHorizontal: 105,
            borderRadius: 10,
            marginTop: 20,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 15,
            color: COLORS.light_grey,
            marginTop: 25,
            paddingHorizontal: 25,
          }}
        >
          Join contest for any of the Upcoming matches
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Contests", {
            data: data,
            amount: amount,
            variation: variation,
          });
        }}
        style={styles.JoinContestButton}
      >
        <Text style={styles.buttonText}>Join Contests</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  JoinContestButton: {
    backgroundColor: COLORS.dark,
    position: "relative",
    top: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: COLORS.silver,
    fontWeight: "bold",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    marginHorizontal: 20,
  },
  buttonText: {
    color: COLORS.light,
    fontWeight: "bold",
    fontSize: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.light_grey,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  backArrow: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
});
