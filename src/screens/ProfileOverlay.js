import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import styles from "../styles/profileOverlay.style";
import { useNavigation } from "@react-navigation/native";

const ProfileOverlay = ({ isVisible, onClose, overlayAnimation }) => {
  const navigation = useNavigation();
  const [isDarkMode, setDarkMode] = useState(false);

  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
    onClose();
  };

  const renderLink = (iconName, text, onPress, isSolid = false) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.linkItem, isSolid && styles.solidLink]}>
      <View style={styles.linkContent}>
        <View style={styles.linkIcon}>
          <Ionicons
            name={iconName}
            size={isSolid ? 22 : 18}
            color={COLORS.primary}
          />
        </View>
        <Text style={[styles.linkText, isSolid && styles.solidLinkText]}>
          {text}
        </Text>
        <View style={styles.arrowIcon}>
          <Ionicons name="ios-arrow-forward" size={18} color={COLORS.primary} />
        </View>
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
        {renderLink(
          "person-outline",
          "Account",
          () => navigateToPage("Account"),
          true
        )}
        {renderLink("md-trophy-outline", "Join Contest", () =>
          navigateToPage("JoinContest")
        )}
        {renderLink("wallet-outline", "My Wallet", () =>
          navigateToPage("Wallet")
        )}
        {renderLink("play-circle-outline", "How to Play", () =>
          navigateToPage("HowToPlay")
        )}
        {renderLink("gift-outline", "Refer & Earn", () =>
          navigateToPage("ReferAndEarn")
        )}
        {renderLink("megaphone-outline", "Offers & Programs", () =>
          navigateToPage("OffersAndPrograms")
        )}
        {renderLink("help-circle-outline", "Help & Support", () =>
          navigateToPage("HelpAndSupport")
        )}

        {/* Toggle Switch for Dark Mode */}
        <View style={styles.darkModeContainer}>
          <Text style={styles.darkModeText}>Dark Mode</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default ProfileOverlay;
