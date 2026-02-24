import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchRecipes from "./SearchRecipes";
import AddRecipe from "./AddRecipe";
import ViewRecipe from "./ViewRecipe";
import RecipesList from "./RecipesList";

const Stack = createNativeStackNavigator();

const NavigationRecipeList = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen name="RecipesList" component={RecipesList} />
      <Stack.Screen name="SearchRecipes" component={SearchRecipes} />
    </Stack.Group>
    <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
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
