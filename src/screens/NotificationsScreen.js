import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const notifications = [
  {
    id: 1,
    type: "achievement",
    title: "New Achievement Unlocked",
    description: 'You unlocked the "Master Explorer" achievement!',
    timestamp: "2023-12-30T10:30:00Z",
  },
  {
    id: 2,
    type: "reward",
    title: "Daily Rewards Available",
    description: "Claim your daily rewards now and get exciting prizes!",
    timestamp: "2023-12-30T08:00:00Z",
  },
  {
    id: 3,
    type: "friend-request",
    title: "New Friend Request",
    description: "JohnDoe123 wants to be your friend. Accept or Decline?",
    timestamp: "2023-12-29T15:45:00Z",
  },
];

const NotificationsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={26}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationContainer}>
            <MaterialCommunityIcons
              name="bullhorn"
              size={26}
              color={COLORS.primary}
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>
                {notification.description}
              </Text>
              <Text style={styles.notificationTimestamp}>
                {new Date(notification.timestamp).toLocaleString()}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.light_grey,
    marginHorizontal: 12,
    marginTop: 6,
  },
  scrollView: {
    flex: 1,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginBottom: 10,
    backgroundColor: COLORS.transparentBg,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    marginVertical: 12,
    marginHorizontal: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  notificationDescription: {
    fontSize: 12,
    color: COLORS.light_grey,
  },
  notificationTimestamp: {
    fontSize: 8,
    color: COLORS.light_grey,
    marginTop: 5,
  },
  backArrow: {
    paddingTop: 12,
    paddingHorizontal: 12,
  },
});

export default NotificationsScreen;
