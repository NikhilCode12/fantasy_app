import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ContestsScreen from "../components/variations/ContestsScreen";
import COLORS from "../constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import VariationsScreen from "../components/variations/VariationsScreen";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  tabBarLabelStyle: {
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

const ContestsNavigation = ({ route }) => {
  const { data, amount, variation } = route.params;

  if (variation === "Ball by Ball Predictor") {
    return null;
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Variations"
        component={VariationsScreen}
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
        name="My Contests"
        component={ContestsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Ionicons
                  name={focused ? "trophy" : "trophy-outline"}
                  size={tabBarSize}
                  color={focused ? COLORS.primary : COLORS.light_grey}
                />
              </>
            );
          },
        }}
      />
      <Tab.Screen
        name="My Teams"
        component={ContestsScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Ionicons
                  name={focused ? "people" : "people-outline"}
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

export default ContestsNavigation;
