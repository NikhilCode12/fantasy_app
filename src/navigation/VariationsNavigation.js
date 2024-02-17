import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import VariationsScreen from "../components/variations/VariationsScreen";
import ContestsScreen from "../components/variations/ContestsScreen";
import BeforeContestDetailsScreen from "../components/variations/BeforeContestDetailsScreen";
import PlayerSelection from "../components/teams/PlayerSelection";

const stack = createStackNavigator();

const VariationsNavigation = ({ navigation, data }) => {
  return (
    <NavigationContainer independent={true}>
      <stack.Navigator>
        <stack.Screen
          name="Variations"
          component={VariationsScreen}
          options={{ headerShown: false }}
          initialParams={data}
        />
        <stack.Screen
          name="Contests"
          component={ContestsScreen}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="PlayerSelection"
          component={PlayerSelection}
          options={{ headerShown: false }}
        />
        <stack.Screen
          name="BeforeContestDetails"
          component={BeforeContestDetailsScreen}
          options={{ headerShown: false }}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default VariationsNavigation;
