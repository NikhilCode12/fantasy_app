import { createStackNavigator } from "@react-navigation/stack";
import VariationsScreen from "../components/variations/VariationsScreen";
import ContestsScreen from "../components/variations/ContestsScreen";
import PlayerSelection from "../components/teams/PlayerSelection";

const VariationsStack = createStackNavigator();

const VariationStackNavigator = () => {
  return (
    <VariationsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <VariationsStack.Screen
        name="VariationsScreen"
        component={VariationsScreen}
        options={{ headerShown: false }}
      />
      <VariationsStack.Screen
        name="Contests"
        component={ContestsScreen}
        options={{ headerShown: false }}
      />
      <VariationsStack.Screen
        name="PlayerSelection"
        component={PlayerSelection}
        options={{ headerShown: false }}
      />
    </VariationsStack.Navigator>
  );
};

export default VariationStackNavigator;
