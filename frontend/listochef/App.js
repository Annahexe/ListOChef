import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Start from "./src/screens/Start/Start";
import Login from "./src/screens/Start/Login/Login";
import Register from "./src/screens/Start/Register/Register";
import Home from "./src/screens/Start/Home";

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator options="false" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
