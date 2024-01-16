import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import styles from "../../styles/upcoming.style";
import COLORS from "../../constants/colors";
import LottieView from "lottie-react-native";

const Upcoming = () => {
  const [loading, setLoading] = useState(true);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      startTypingAnimation("Coming Soon...");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const startTypingAnimation = (text) => {
    let index = 0;
    const textLength = text.length;

    const typingInterval = setInterval(() => {
      setDisplayText((prevText) => prevText + text[index]);
      index++;

      if (index === textLength) {
        clearInterval(typingInterval);
      }
    }, 100);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: "-20%" }}
          />
        ) : (
          <Text style={styles.text}>{displayText.toUpperCase()}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Upcoming;
