import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./src/navigation/BottomNavigation";

import {
  LoginScreen,
  EmailAuthenticationScreen,
  WelcomeScreen,
  OTPScreen,
  NotificationsScreen,
  WalletScreen,
  TopUpScreen,
  WithdrawlScreen,
  MyTransactions,
  AddCardsScreen,
  InviteFriendsScreen,
  PrivateContestJoin
} from "./src/screens/index";
import DrawerNavigation from "./src/navigation/DrawerNavigation";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailAuthentication"
          component={EmailAuthenticationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Otp"
          component={OTPScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigation"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Wallet"
          component={WalletScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="addBalance"
          component={TopUpScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Withdraw"
          component={WithdrawlScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyTransactions"
          component={MyTransactions}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AddCards"
          component={AddCardsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="InviteFriends"
          component={InviteFriendsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PrivateContestJoin"
          component={PrivateContestJoin}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
