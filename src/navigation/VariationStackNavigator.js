import { createStackNavigator } from "@react-navigation/stack";
import VariationsScreen from "../components/variations/VariationsScreen";
import ContestsScreen from "../components/variations/ContestsScreen";
import PlayerSelection from "../components/teams/PlayerSelection";
import PreviewScreen from "../components/teams/PreviewScreen";
import CaptainAndViceSelection from "../components/teams/CaptainAndViceSelection";

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
      <VariationsStack.Screen
        name="TeamPreview"
        component={PreviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CaptainAndViceSelection"
        component={CaptainAndViceSelection}
        options={{ headerShown: false }}
      />
    </VariationsStack.Navigator>
  );
};

export default VariationStackNavigator;
