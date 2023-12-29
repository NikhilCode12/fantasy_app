import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import styles from "../styles/profileOverlay.style";
import { useNavigation } from "@react-navigation/native";

const ProfileOverlay = ({ isVisible, onClose, overlayAnimation }) => {
  const navigation = useNavigation();

  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
    onClose();
  };

  const renderLink = (iconName, text, onPress) => (
    <TouchableOpacity onPress={onPress} style={styles.linkItem}>
      <View style={styles.linkContent}>
        <Ionicons name={iconName} size={18} color={COLORS.primary} />
        <Text style={styles.linkText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.overlayContainer}>
      <Animated.View
        style={[
          styles.overlayBox,
          {
            transform: [{ translateX: overlayAnimation }],
          },
        ]}>
        {renderLink("person-outline", "Account", () =>
          navigateToPage("Account")
        )}
        {renderLink("wallet-outline", "Wallet", () => navigateToPage("Wallet"))}
        {renderLink("help-circle-outline", "Help & Support", () =>
          navigateToPage("Help & Support")
        )}
        {renderLink("play-circle-outline", "How to Play", () =>
          navigateToPage("HowToPlay")
        )}
        {renderLink("ellipsis-horizontal-outline", "More", () =>
          navigateToPage("More")
        )}
        {renderLink("gift-outline", "Refer and Earn", () =>
          navigateToPage("ReferAndEarn")
        )}

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ProfileOverlay;
