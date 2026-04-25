import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Expenses from "./Expenses";
import AddTicket from "./AddTicket";
import ViewTicket from "./ViewTicket";

const Stack = createNativeStackNavigator();

const NavigationExpenses = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen name="Expenses" component={Expenses} />
      <Stack.Screen name="AddTicket" component={AddTicket} />
      <Stack.Screen name="ViewTicket" component={ViewTicket} />
    </Stack.Group>
  </Stack.Navigator>
);

export default NavigationExpenses;
