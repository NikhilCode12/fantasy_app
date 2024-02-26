import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const notifications = [
  {
    id: 1,
    type: "achievement",
    title: "New Achievement Unlocked",
    description: 'You have unlocked the "Beginner" achievement. Keep it up!',
    timestamp: "Today, 8:30 AM",
  },
  {
    id: 2,
    type: "reward",
    title: "Daily Rewards Available",
    description: "Claim your daily rewards now and get exciting prizes!",
    timestamp: "Yesterday, 10:30 AM",
  },
  {
    id: 3,
    type: "friend-request",
    title: "New Friend Request",
    description: "JohnDoe123 wants to be your friend. Accept or Decline?",
    timestamp: "Today, 10:30 AM",
  },
];

const NotificationsScreen = ({ navigation }) => {
  // Animated value for newest notification animation
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  // Animate newest notification
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {notifications.map((notification, index) => (
          <Animated.View
            key={notification.id}
            style={[
              styles.notificationContainer,
              index === 0 && { transform: [{ scale: scaleAnim }] },
              index === 0 && { backgroundColor: "#2c3e50" },
            ]}
          >
            <FontAwesome5
              name={getIconName(notification.type)}
              size={20}
              color={index === 0 ? COLORS.primary : COLORS.light_grey}
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.notificationTitle,
                  { color: index === 0 ? COLORS.primary : COLORS.light_grey },
                ]}
              >
                {notification.title}
              </Text>
              <Text style={styles.notificationDescription}>
                {notification.description}
              </Text>
              <Text style={styles.notificationTimestamp}>
                {notification.timestamp}
              </Text>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const getIconName = (type) => {
  switch (type) {
    case "achievement":
      return "trophy";
    case "reward":
      return "gift";
    case "friend-request":
      return "user-plus";
    default:
      return "bullhorn";
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
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
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 10,
    backgroundColor: COLORS.transparentBg,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 20,
    shadowColor: COLORS.light_grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 0,
  },
  icon: {
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  notificationTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  notificationDescription: {
    fontSize: 12,
    color: COLORS.light_grey,
  },
  notificationTimestamp: {
    fontSize: 11,
    color: COLORS.light_grey,
    marginTop: 5,
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

export default NotificationsScreen;
