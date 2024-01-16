import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Button,
  TextInput,
} from "react-native";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/wallet.screen.style";
import { Ionicons } from "@expo/vector-icons";
import styles2 from "../styles/top-up.screen.style.js";
import DeleteIcon from "../components/common/DeleteIcon.js";
import Toast from "react-native-toast-message";

const TopUpScreen = ({ navigation }) => {
  const [addedAmount, setAddedAmount] = useState("");
  const [isFocused, setisFocused] = useState(false);
  const [inputColor, setInputColor] = useState(COLORS.lightGray);
  const [showPayButton, setShowPayButton] = useState(false);

  useEffect(() => {
    if (inputColor === "crimson") {
      const timer = setTimeout(() => {
        setInputColor(COLORS.lightGray);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inputColor]);

  const onChangeAmount = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");

    if (!isNaN(numericValue)) {
      const formattedValue = new Intl.NumberFormat("en-IN").format(
        parseInt(numericValue, 10)
      );
      setAddedAmount(formattedValue);
      setShowPayButton(true);
    } else {
      setAddedAmount("");
    }
  };

  const shakeAnimation = new Animated.Value(0);

  const startShakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const onPressPay = () => {
    if (parseInt(addedAmount, 10) < 1) {
      setInputColor("crimson");
      startShakeAnimation();
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Please enter a valid amount",
        visibilityTime: 1000,
      });
    } else {
      setInputColor(COLORS.lightGray);
      navigation.navigate("Wallet", { addedAmount });
    }
  };

  const amountValues = [500, 1000, 1500, 2000];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrow}>
          <Ionicons
            name="arrow-back"
            size={24}
            onPress={() => {
              navigation.goBack();
            }}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Balance</Text>
      </View>
      <View style={styles2.topUpContainer}>
        <Text
          style={{
            color: COLORS.light,
            fontWeight: "700",
          }}
        >
          Enter Amount (Min {"\u20B9"}1)
        </Text>
        <Animated.View
          style={{
            backgroundColor: COLORS.teflon,
            paddingHorizontal: 12,
            flexDirection: "row",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: 8,
            marginVertical: 16,
            borderWidth: 1,
            borderColor: inputColor,
            borderBottomColor: isFocused ? COLORS.primary : "transparent",
            transform: [{ translateX: shakeAnimation }],
          }}
        >
          <Text style={{ color: COLORS.primary, fontSize: 24 }}>
            {"\u20B9"}
          </Text>
          <TextInput
            style={{
              ...styles.numberSize,
              width: "80%",
              marginLeft: -4,
              fontSize: 20,
              color: COLORS.primary,
              fontWeight: "bold",
            }}
            cursorColor={COLORS.primary}
            value={addedAmount}
            onChangeText={onChangeAmount}
            keyboardType="phone-pad"
            onFocus={() => {
              setisFocused(true);
              setInputColor(COLORS.primary);
            }}
            onBlur={() => {
              setisFocused(false);
              setInputColor(COLORS.lightGray);
            }}
          />
          <DeleteIcon
            onPress={() => {
              setAddedAmount("");
              setShowPayButton(false);
            }}
          />
        </Animated.View>
        <View>
          <Text
            style={{
              color: COLORS.light_grey,
              fontWeight: "700",
              fontSize: 13,
            }}
          >
            Instant (Click to add)
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 12,
              justifyContent: "space-between",
            }}
          >
            {amountValues.map((amount, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: COLORS.bgMateBlack,
                  borderWidth: 1,
                  borderColor: COLORS.primary,
                  paddingHorizontal: 12,
                  marginRight: 10,
                  paddingVertical: 8,
                  borderRadius: 5,
                }}
                onPress={() => {
                  const formattedValue = new Intl.NumberFormat("en-IN").format(
                    parseInt(amount, 10)
                  );
                  setAddedAmount(formattedValue.toString());
                }}
              >
                <Text style={{ ...styles.buttonText, fontSize: 14 }}>
                  {"\u20B9"}
                  {amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {showPayButton && (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              marginVertical: 16,
              width: "100%",
            }}
          >
            <Button
              title={`Pay \u20B9${addedAmount}`}
              color={"#005d4b"}
              onPress={onPressPay}
            />
            <Toast ref={(ref) => Toast.setRef(ref)} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TopUpScreen;
