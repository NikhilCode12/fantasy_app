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
            color={"#005d4b"}
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
            <TouchableOpacity style={styles.buttonContainer}>
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
        <View style={styles.detailsBox}>
          <Text style={styles.detailsText}>My Transactions</Text>
          <TouchableOpacity style={styles.arrowStyle}>
            <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainerBox}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.detailsText}>Manage Payments</Text>
            <TouchableOpacity style={styles.arrowStyle}>
              <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.detailssubText}>
            Add/Remove cards, wallets, etc.
          </Text>
        </View>
        <View style={styles.detailsContainerBox}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.detailsText}>Invite & Collect</Text>
            <TouchableOpacity style={styles.arrowStyle}>
              <Ionicons name="arrow-forward" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.detailssubText}>
            Bring your friends on Fanverse and earn rewards
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletScreen;
