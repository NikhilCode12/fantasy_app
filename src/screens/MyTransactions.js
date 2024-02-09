import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../constants/colors";
import Button from "../components/common/Button";
import BackArrow from "../components/common/BackArrow";
import styles from "../styles/MyTransactions.style";
import { Ionicons } from "@expo/vector-icons";
const TransactionsData = require('../constants/transactions.json');
export default function MyTransactions({ navigation }){
    return (
        <SafeAreaView style={styles.container}>

         
         <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backArrow}  onPress={() => {
              navigation.goBack();
            }}>
          <Ionicons
            name="arrow-back"
            size={24}
           
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Transactions</Text>
      </View>
              <ScrollView style={styles.scrollarea}>
      <View>
       
      {/* <Text>Data from JSON:</Text> */}
      {TransactionsData.map(item => (
         <View style={styles.detailsContainer} key={item.id}>
            <View style={styles.detailsBox}>
                <View>
                <Text style={styles.transType}>Transaction id : {item.id}</Text>
                <Text style={styles.detailsText}>{item.date} {item.time}</Text>
                    </View>
                    <View>
                    <Text style={[ item.type == "Added" ? styles.AddedMoney : styles.withdrawlMoney , styles.transMoney]}> {'\u20B9'}{item.amount}</Text>
                {/* <TouchableOpacity style={styles.arrowStyle}  onPress={() => {
                    navigation.navigate("MyTransactions");
                }}>
            <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
          </TouchableOpacity> */}
                  </View>
            </View>
        </View>
      ))}
    </View>
        
        
      </ScrollView>
        </SafeAreaView>
    );
}
