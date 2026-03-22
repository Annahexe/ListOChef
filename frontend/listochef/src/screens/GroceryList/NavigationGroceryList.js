import { createNativeStackNavigator } from "@react-navigation/native-stack";

import GroceryList from "./GroceryList";
import AddProduct from "./AddProduct";

const Stack = createNativeStackNavigator();

const NavigationGroceryList = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen name="GroceryList" component={GroceryList} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Group>
  </Stack.Navigator>
);

export default NavigationGroceryList;
