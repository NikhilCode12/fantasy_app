import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/wallet.screen.style";
import { Ionicons } from "@expo/vector-icons";

const user = {
  balance: "0.00",
  amountUnutilised: "0",
  winnings: "0",
  bonus: "50",
};

const WalletScreen = ({ navigation }) => {
  const addedAmount = navigation.params?.addedAmount;
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
        <Text style={styles.headerText}>My Wallet</Text>
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceHeadingText}>Current Balance</Text>
          <Text style={styles.balanceText}>
            {"\u20B9"}
            {addedAmount !== undefined ? addedAmount : user.balance}
          </Text>
          <Button
            title="ADD BALANCE"
            color={"teal"}
            onPress={() => {
              navigation.navigate("addBalance");
            }}
          />
        </View>
        <View style={styles.separator}></View>
        <View style={styles.menuContainer}>
          <View style={styles.topBox}>
            <Text style={styles.boxText}>Amount Unutilised</Text>
            <TouchableOpacity>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>
              {"\u20B9"}
              {user.amountUnutilised}
            </Text>
          </View>
        </View>
        <View style={styles.separator}></View>
        <View style={{ ...styles.menuContainer }}>
          <View style={styles.topBox}>
            <Text style={styles.boxText}>Winnings</Text>
            <TouchableOpacity>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>
              {"\u20B9"}
              {user.winnings}
            </Text>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                navigation.navigate("Withdraw");
              }}
            >
              <Text style={styles.buttonText}>WITHDRAW INSTANTLY</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator}></View>
        <View style={{ ...styles.menuContainer, marginBottom: 14 }}>
          <View style={styles.topBox}>
            <Text style={styles.boxText}>Discount Bonus</Text>
            <TouchableOpacity>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.amountBox}>
            <Text style={styles.amountText}>
              {"\u20B9"}
              {user.bonus}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <TouchableOpacity
          style={styles.detailsBox}
          onPress={() => {
            navigation.navigate("MyTransactions");
          }}
        >
          <Text style={styles.detailsText}>My Transactions</Text>
          <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsContainerBox}
          onPress={() => {
            navigation.navigate("AddCards");
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.detailsText}>Manage Payments</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
          </View>
          <Text style={styles.detailssubText}>
            Add/Remove cards, wallets, etc.
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.detailsContainerBox}
          onPress={() => {
            navigation.navigate("InviteFriends");
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.detailsText}>Invite & Collect</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
          </View>
          <Text style={styles.detailssubText}>
            Bring your friends on Fanverse and earn rewards
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
