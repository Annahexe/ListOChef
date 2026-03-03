import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "./Profile";
import Subscription from "./Subscription";
import EditProfile from "./EditProfile";

const Stack = createNativeStackNavigator();

const NavigationProfile = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ animation: "none" }}
      />
      <Stack.Screen
        name="Subscription"
        component={Subscription}
        options={{ animation: "none" }}
      />
    </Stack.Group>
    <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false, headerMode: "none" }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default NavigationProfile;
