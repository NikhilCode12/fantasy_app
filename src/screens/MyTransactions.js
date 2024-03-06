import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import COLORS from "../constants/colors";
import styles from "../styles/MyTransactions.style";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
const TransactionsData = require("../constants/transactions.json");
export default function MyTransactions({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Transactions</Text>
      </View>
      <ScrollView
        style={styles.scrollarea}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* <Text>Data from JSON:</Text> */}
          {TransactionsData.map((item) => (
            <View style={styles.detailsContainer} key={item.id}>
              <View style={styles.detailsBox}>
                <View>
                  <Text style={styles.transType}>{"ID: " + item.id}</Text>
                  <Text style={styles.detailsText}>
                    {item.date + ", "}
                    {item.time}
                  </Text>
                </View>
                <View>
                  <Text
                    style={[
                      item.type == "Added"
                        ? styles.AddedMoney
                        : styles.withdrawlMoney,
                      styles.transMoney,
                    ]}
                  >
                    {" "}
                    {"\u20B9"}
                    {item.amount}
                  </Text>
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
