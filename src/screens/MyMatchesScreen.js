import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Animated,
  Easing,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import { StyleSheet } from "react-native";
import MyMatchesMain from "../MyMatches/MyMatchesMain";
import { Ionicons } from "@expo/vector-icons";
import ProfileOverlay from "../screens/ProfileOverlay";
import { useNavigation } from "@react-navigation/native";

const MyMatchesScreen = ({}) => {
  const navigation = useNavigation();
  const [isProfileOverlayVisible, setProfileOverlayVisible] = useState(false);
  const [overlayAnimation] = useState(new Animated.Value(-300));

  const handleMatchCardPress = (data) => {
    navigation.navigate("VariationsScreen", { data: data });
  };

  const openProfileOverlay = () => {
    setProfileOverlayVisible(true);
  };

  const closeProfileOverlay = () => {
    Animated.timing(overlayAnimation, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => setProfileOverlayVisible(false));
  };

  useEffect(() => {
    if (isProfileOverlayVisible) {
      Animated.timing(overlayAnimation, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, [isProfileOverlayVisible, overlayAnimation]);
  useEffect(() => {
    const backAction = () => {
      closeProfileOverlay();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.appBarContainer}>
        <View style={styles.appBar}>
          <TouchableOpacity
            style={styles.appBarIconsBg}
            onPress={openProfileOverlay}
          >
            <Ionicons name="person-outline" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.appBarHeading}>Fanverse</Text>
          <View style={styles.appBarRight}>
            <TouchableOpacity
              style={styles.appBarIconsBg}
              onPress={() => {
                navigation.navigate("Notification");
              }}
            >
              <Ionicons
                name="ios-notifications-outline"
                size={22}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.appBarIconsBg}
              onPress={() => {
                navigation.navigate("Wallet");
              }}
            >
              <Ionicons
                name="wallet-outline"
                size={22}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <MyMatchesMain onMatchCardPress={handleMatchCardPress} />
      <ProfileOverlay
        isVisible={isProfileOverlayVisible}
        onClose={closeProfileOverlay}
        overlayAnimation={overlayAnimation}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  appBarContainer: {
    backgroundColor: COLORS.dark,
    paddingBottom: 16,
  },
  appBar: {
    marginTop: 16,
    marginHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appBarHeading: {
    fontSize: 20,
    marginLeft: "8.5%",
    color: COLORS.light,
    fontWeight: "bold",
  },
  appBarRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
  },
  appBarIconsBg: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    padding: 8,
  },
});

export default MyMatchesScreen;


