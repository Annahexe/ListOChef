import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "./src/context/Context";
import { useFonts } from "expo-font";

import Start from "./src/screens/Start/Start";
import Login from "./src/screens/Start/Login/Login";
import ResetPassword from "./src/screens/Start/Login/ResetPassword";
import Register from "./src/screens/Start/Register/Register";
import TermsConditions from "./src/screens/Start/Register/TermsConditions";
import Home from "./src/screens/Start/Home";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),

    InterRegular: require("./assets/fonts/Inter_24pt-Regular.ttf"),
    InterMedium: require("./assets/fonts/Inter_24pt-Medium.ttf"),
    InterSemiBold: require("./assets/fonts/Inter_24pt-SemiBold.ttf"),
    InterBold: require("./assets/fonts/Inter_24pt-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider>
      <Provider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ animation: "slide_from_right", headerShown: false }}>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="TermsConditions" component={TermsConditions} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}
