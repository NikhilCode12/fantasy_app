import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import COLORS from "../constants/colors.js";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddCardsScreen = ({ navigation }) => {
  const { createToken } = useStripe();
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadCardsFromStorage();
  }, []);

  const loadCardsFromStorage = async () => {
    try {
      const storedCards = await AsyncStorage.getItem("user_cards");
      if (storedCards !== null) {
        setCards(JSON.parse(storedCards));
      }
    } catch (error) {
      console.error("Error loading cards from AsyncStorage:", error);
    }
  };

  const saveCardToStorage = async (newCard) => {
    try {
      const updatedCards = [...cards, newCard];
      await AsyncStorage.setItem("user_cards", JSON.stringify(updatedCards));
      setCards(updatedCards);
    } catch (error) {
      console.error("Error saving card to AsyncStorage:", error);
    }
  };

  const handleAddCard = async () => {
    if (!cardHolderName || !cardNumber || !expiryDate || !cvv) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.SHORT);
      return;
    }

    try {
      const cardDetails = {
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv,
      };
      console.log("Card details:", cardDetails);

      const token = await createToken({
        card: {
          number: cardNumber,
          expMonth: expiryDate.split("/")[0],
          expYear: expiryDate.split("/")[1],
          cvc: cvv,
          zip: zip,
        },
      });
      console.log("Token:", token);

      if (token.error) {
        ToastAndroid.show(token.error.message, ToastAndroid.SHORT);
        return;
      }

      cardDetails.token = token.id;

      const updatedCards = [...cards, cardDetails];
      await AsyncStorage.setItem("user_cards", JSON.stringify(updatedCards));
      setCards(updatedCards);

      console.log("Card Added Successfully");
      ToastAndroid.show("Card Added Successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error adding card:", error);
      ToastAndroid.show("Error adding card", ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Cards</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Cardholder Name"
          onChangeText={(name) => setCardHolderName(name)}
          maxLength={25}
        />
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: "Card Number (16 digits)",
          }}
          cardStyle={[
            styles.cardField,
            { color: cardNumber ? "black" : "white" },
          ]}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardNumber(cardDetails.number);
            setExpiryDate(cardDetails.expMonth + "/" + cardDetails.expYear);
            setCvv(cardDetails.cvc);
            setZip(cardDetails.zip);
          }}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCardsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgMateBlack,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backArrow: {
    backgroundColor: COLORS.transparentBg,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    color: COLORS.primary,
    padding: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.light_grey,
    marginHorizontal: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  input: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: COLORS.lightGray,
    borderWidth: 1,
    color: COLORS.light,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContainer: {
    height: 50,
    marginVertical: 20,
    paddingHorizontal: 20,
    color: COLORS.light,
  },
  cardField: {
    borderRadius: 5,
    fontSize: 16,
  },
});
