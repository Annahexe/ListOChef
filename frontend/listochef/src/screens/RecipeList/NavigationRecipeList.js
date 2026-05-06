import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchRecipes from "./SearchRecipes";
import AddRecipe from "./AddRecipe";
import ViewRecipe from "./ViewRecipe";
import RecipesList from "./RecipesList";

const Stack = createNativeStackNavigator();

/**
 * Stack navigator for the Recipes section.
 * Contains four screens: RecipesList and SearchRecipes as main screens,
 * and AddRecipe and ViewRecipe presented as transparent bottom-sheet modals.
 *
 * @returns {JSX.Element} Recipes stack navigator.
 */
const NavigationRecipeList = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen name="RecipesList" component={RecipesList} />
      <Stack.Screen name="SearchRecipes" component={SearchRecipes} />
    </Stack.Group>
    <Stack.Group
      screenOptions={{
        presentation: "transparentModal",
        animation: "slide_from_bottom",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AddRecipe"
        component={AddRecipe}
        options={{ headerShown: false, headerMode: "none" }}
      />
      <Stack.Screen
        name="ViewRecipe"
        component={ViewRecipe}
        options={{ headerShown: false, headerMode: "none" }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default NavigationRecipeList;
