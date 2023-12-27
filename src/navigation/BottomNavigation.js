import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import {
  HomeScreen,
  PeopleScreen,
  LeaderBoardScreen,
  RewardsScreen,
} from "./index";
import COLORS from "../constants/colors";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 50,
  },
  headerShown: false,
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={focused ? COLORS.btn : COLORS.light_grey}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="People"
        component={PeopleScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Ionicons
                  name={focused ? "people" : "people-outline"}
                  size={24}
                  color={focused ? COLORS.btn : COLORS.light_grey}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoardScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Ionicons
                  name={focused ? "trophy" : "trophy-outline"}
                  size={24}
                  color={focused ? COLORS.btn : COLORS.light_grey}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Ionicons
                  name={focused ? "gift" : "gift-outline"}
                  size={24}
                  color={focused ? COLORS.btn : COLORS.light_grey}
                />
              </>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
