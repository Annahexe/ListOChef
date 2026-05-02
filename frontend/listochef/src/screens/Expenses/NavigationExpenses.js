import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Expenses from "./Expenses";
import AddTicket from "./AddTicket";
import ViewTicket from "./ViewTicket";

const Stack = createNativeStackNavigator();

const NavigationExpenses = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen name="Expenses" component={Expenses} />
    </Stack.Group>
    <Stack.Group
      screenOptions={{
        presentation: "transparentModal",
        animation: "slide_from_bottom",
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddTicket" component={AddTicket} options={{ headerShown: false, headerMode: "none" }} />
      <Stack.Screen name="ViewTicket" component={ViewTicket} options={{ headerShown: false, headerMode: "none" }} />
    </Stack.Group>
  </Stack.Navigator>
);

export default NavigationExpenses;
