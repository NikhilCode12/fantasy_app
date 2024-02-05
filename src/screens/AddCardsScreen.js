import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from "../styles/AddCardsScreen.style";
import COLORS from '../constants/colors';
const AddCardsScreen = ({ navigation }) => {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleAddCard = () => {
    if(cardHolderName=="")
    {
       ToastAndroid.show(
                      "Enter CardHolder Name",
                      ToastAndroid.SHORT
                    );
                  } else if(cardNumber.length!=16)
                  {
      ToastAndroid.show(
                     "Enter Valid Card Number",
                     ToastAndroid.SHORT
                   );

    }
    else if(expiryDate.length!=5)
    { 
      ToastAndroid.show(
                     "Enter Date in format MM/YY",
                     ToastAndroid.SHORT
                   );
                  }
                  else if(cvv.length!=3) {
      ToastAndroid.show(
                     "Enter Date in format MM/YY",
                     ToastAndroid.SHORT
                   );

    }
    else
     ToastAndroid.show(
                      "Card Added Successfully",
                      ToastAndroid.SHORT
                    );
    // Implement logic to handle adding the credit card
    // You can access the entered values: cardHolderName, cardNumber, expiryDate, cvv
  };

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
        <Text style={styles.headerText}>Add Cards</Text>
      </View>
      <View style={styles.formContainer}>
        {/* Cardholder Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Cardholder Name"
          placeholderTextColor={COLORS.light_grey}
          onChangeText={(name) => setCardHolderName(name)}
        />

        {/* Card Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Card Number (16 digits)"
          keyboardType="numeric"
          maxLength={16}
            placeholderTextColor={COLORS.light_grey}
          onChangeText={(number) => setCardNumber(number)}
        />

        {/* Expiry Date Input */}
        <TextInput
          style={styles.input}
          placeholder="Expiry Date (MM/YY)"
            placeholderTextColor={COLORS.light_grey}
          maxLength={5}
          onChangeText={(date) => setExpiryDate(date)}
        />

        {/* CVV Input */}
        <TextInput
          style={styles.input}
          placeholder="CVV"
            placeholderTextColor={COLORS.light_grey}
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(cvv) => setCvv(cvv)}
        />

        {/* Add Card Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default AddCardsScreen;
