import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import styles from "../styles/profileOverlay.style";
import { useNavigation } from "@react-navigation/native";

const ProfileOverlay = ({ onClose }) => {
  const navigation = useNavigation();
  const [translateX] = useState(new Animated.Value(-300));

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [translateX]);

  const closeOverlay = () => {
    Animated.timing(translateX, {
      toValue: -300,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => onClose());
  };

  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
    closeOverlay();
  };

  return (
    <View style={styles.overlayContainer}>
      <Animated.View
        style={[
          styles.overlayBox,
          {
            transform: [{ translateX: translateX }],
          },
        ]}>
        <TouchableOpacity
          onPress={() => navigateToPage("Account")}
          style={styles.linkItem}>
          <Text style={styles.linkText}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToPage("Wallet")}
          style={styles.linkItem}>
          <Text style={styles.linkText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToPage("Help & Support")}
          style={styles.linkItem}>
          <Text style={styles.linkText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToPage("HowToPlay")}
          style={styles.linkItem}>
          <Text style={styles.linkText}>How to Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToPage("More")}
          style={styles.linkItem}>
          <Text style={styles.linkText}>More</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToPage("ReferAndEarn")}
          style={styles.linkItem}>
          <Text style={styles.linkText}>Refer and Earn</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={closeOverlay} style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ProfileOverlay;
