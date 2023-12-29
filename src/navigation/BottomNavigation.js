import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  PeopleScreen,
  LeaderBoardScreen,
  RewardsScreen,
} from "./index";
import COLORS from "../constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  tabBarLabelStyle: {
    // color: COLORS.light_grey,
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 8,
    marginTop: -8,
  },
  tabBarStyle: {
    backgroundColor: COLORS.bgMateBlack,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 0,
    elevation: 0,
    height: 60,
  },
  tabBarActiveTintColor: COLORS.primary,
  headerShown: false,
};

const tabBarSize = 24;

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
                  size={tabBarSize}
                  color={focused ? COLORS.primary : COLORS.light_grey}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="My Matches"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <MaterialCommunityIcons
                  name={focused ? "stadium" : "stadium-variant"}
                  size={tabBarSize}
                  color={focused ? COLORS.primary : COLORS.light_grey}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="Variations"
        component={PeopleScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Ionicons
                  name={focused ? "options" : "options-outline"}
                  size={tabBarSize}
                  color={focused ? COLORS.primary : COLORS.light_grey}
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
                  name={focused ? "podium" : "podium-outline"}
                  size={tabBarSize}
                  color={focused ? COLORS.primary : COLORS.light_grey}
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
                  size={tabBarSize}
                  color={focused ? COLORS.primary : COLORS.light_grey}
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
