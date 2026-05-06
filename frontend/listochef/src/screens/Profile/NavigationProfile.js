import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import EditProfile from "./EditProfile";

const Stack = createNativeStackNavigator();

/**
 * Stack navigator for the Profile section.
 * Contains two screens: Profile (main, no animation) and EditProfile,
 * which is presented as a transparent bottom-sheet modal.
 *
 * @returns {JSX.Element} Profile stack navigator.
 */
const NavigationProfile = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ animation: "none" }}
      />
    </Stack.Group>
    <Stack.Group
      screenOptions={{
        presentation: "transparentModal",
        animation: "slide_from_bottom",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false, headerMode: "none" }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default NavigationProfile;
