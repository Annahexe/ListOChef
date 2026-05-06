import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Pantry from "./Pantry";
import AddPantry from "./AddPantry";

const Stack = createNativeStackNavigator();

/**
 * Stack navigator for the Pantry section.
 * Contains two screens: Pantry (main) and AddPantry.
 *
 * @returns {JSX.Element} Pantry stack navigator.
 */
const NavigationPantry = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen name="Pantry" component={Pantry} />
      <Stack.Screen name="AddPantry" component={AddPantry} />
    </Stack.Group>
  </Stack.Navigator>
);

export default NavigationPantry;
