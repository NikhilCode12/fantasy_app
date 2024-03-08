import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeScreen,
  LeaderBoardScreen,
  RewardsScreen,
  VariationsScreen,
  MyMatchesScreen,
} from "../../navigation/index";
import ContestsScreen from "./ContestsScreen";
import COLORS from "../../constants/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import MyContestsScreen from "./MyContestsScreen";
import MyTeamsScreen from "./MyTeamsScreen";
import BallByBallContestScreen from "./BallByBallContestScreen";
import { NavigationContainer } from "@react-navigation/native";
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

const BottomNavigation = ({ route }) => {
  const {
    data,
    amount,
    variation,
    PlayersData,
    captainName,
    viceCaptainName,
    title,
  } = route.params;
  // useEffect(() => {
  //   if (PlayersData) console.log("Have players data");
  //   else {
  //     console.log("NO PLAYERS DATA");
  //   }
  // }, []);

  if (variation === "Ball by Ball Predictor") {
    return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Contests"
          component={BallByBallContestScreen}
          initialParams={{ data, amount, variation, title }}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <>
                  <MaterialCommunityIcons
                    name={focused ? "trophy-variant" : "trophy-variant-outline"}
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
          component={MyContestsScreen}
          initialParams={{ data, amount, variation, title }}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialCommunityIcons
                  name={focused ? "trophy-variant" : "trophy-variant-outline"}
                  size={tabBarSize}
                  color={focused ? COLORS.primary : COLORS.light_grey}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Contests"
        component={ContestsScreen}
        initialParams={{ data, amount, variation }}
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
        name="My Contests"
        component={MyContestsScreen}
        initialParams={{ data, amount, variation }}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <MaterialCommunityIcons
                  name={focused ? "trophy-variant" : "trophy-variant-outline"}
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
        component={MyTeamsScreen}
        initialParams={{
          data,
          amount,
          variation,
          PlayersData,
          captainName,
          viceCaptainName,
        }}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <>
                <Ionicons
                  name={focused ? "person-add" : "person-add-outline"}
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
