import { createStackNavigator } from '@react-navigation/stack';

import GeneralRecipes from './GeneralRecipes';
import AddRecipe from './AddRecipe';
import ViewRecipe from './ViewRecipe';
import RecipesList from './RecipesList';

const Stack = createStackNavigator();

const NavigationRecipeList = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Group>
      <Stack.Screen name="RecipesList" component={RecipesList} />
      <Stack.Screen name="GeneralRecipes" component={GeneralRecipes} />
    </Stack.Group>
    <Stack.Group screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="AddRecipe" component={AddRecipe} options={{ headerShown: true, headerMode: 'none' }} />
      <Stack.Screen name="ViewRecipe" component={ViewRecipe} options={{ headerShown: true, headerMode: 'none' }} />
    </Stack.Group>
  </Stack.Navigator>
);

export default NavigationRecipeList;
