import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Switch,
  Linking,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import styles from "../styles/profileOverlay.style";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const ProfileOverlay = ({ isVisible, onClose, overlayAnimation }) => {
  const navigation = useNavigation();
  const [isDarkMode, setDarkMode] = useState(true);

  const navigateToPage = (pageName) => {
    navigation.navigate(pageName);
    onClose();
  };

  const renderLink = (iconName, text, onPress, isSolid = false) => (
  

    <TouchableOpacity
      onPress={onPress}
      style={[styles.linkItem, isSolid && styles.solidLink]}
    >
      <View style={styles.linkContent}>
        <View style={styles.linkIcon}>
          <Ionicons
            name={iconName}
            size={isSolid ? 22 : 18}
            color={isSolid ? COLORS.light : COLORS.primary}
          />
        </View>
        {isSolid ?  <View style={{flexDirection:"column"}}>
        <View style={styles.accountTextContainer}><Text style={[ isSolid && styles.solidLinkText]}>{text}</Text></View>
        <View style={styles.pointsTextContainer}><Text style={styles.pointsText}>Points: 320</Text></View>
       
      </View>
      :  <Text style={[styles.linkText, isSolid && styles.solidLinkText]}>
          {text}
        
        </Text>}
       
        {isSolid == false && (
          <View style={styles.arrowIcon}>
            <Ionicons name="ios-arrow-forward" size={18} color={COLORS.light} />
          </View>
        )}
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
        ]}
      >
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        {renderLink("person-outline", "Account", () => {
          navigateToPage("AccountScreen")
        }, true)}
        {renderLink("md-trophy-outline", "Join Contest", () => {
          /* navigateToPage("JoinContest") */
        })}
        {renderLink("wallet-outline", "My Wallet", () => {
          /* navigateToPage("Wallet") */
        })}
        {renderLink("play-circle-outline", "How to Play", () => {
          /* navigateToPage("HowToPlay") */
        })}
        {renderLink("gift-outline", "Refer & Earn", () => {
          /* navigateToPage("InviteFriends") */
        })}
        {renderLink("game-controller", "Private Contest", () => {
          /* navigateToPage("PrivateContestJoin") */
        })}
        {/* {renderLink("megaphone-outline", "Offers & Programs", () =>
          navigateToPage("OffersAndPrograms")
        )} */}
        {renderLink("help-circle-outline", "Help & Support", () => {
          /* navigateToPage("HelpAndSupport") */
        })}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
        {/* Toggle Switch for Dark Mode */}
        {/* <View style={styles.divider} /> */}
        <View style={styles.darkModeContainer}>
          <Ionicons name={"bulb"} size={22} color={COLORS.primary} />
          <Text style={styles.darkModeText}>Dark Mode</Text>
          <Switch
            style={styles.darkmodetoggler}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={"#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setDarkMode(!isDarkMode);
            }}
            value={isDarkMode}
          />
        </View>
        {/* Divider */}
        {/* <View style={styles.divider} /> */}

        <View style={styles.followuscontainer}>
          <Text style={styles.followustext}>Follow us</Text>
          <View style={styles.iconscontainer}>
            <Ionicons name={"logo-facebook"} size={30} color="#ffffff" />
            <Ionicons name={"logo-instagram"} size={30} color="#ffffff" />
            <Ionicons name={"logo-twitter"} size={30} color="#ffffff" />
            <Ionicons name={"logo-youtube"} size={30} color="#ffffff" />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default ProfileOverlay;
