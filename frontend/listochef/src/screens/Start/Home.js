import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import RecipeList from "../RecipeList/RecipesList";
import GroceryList from "../GroceryList/GroceryList"
import Pantry from "../Pantry/Pantry"
import Expenses from "../Expenses/Expenses";
import Profile from "../Profile/Profile";
import NavigationRecipeList from "../RecipeList/NavigationRecipeList";

const Tab = createBottomTabNavigator();

const Home = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#000' },
    }}
  >
    <Tab.Screen name="NavigationRecipeList" component={NavigationRecipeList} />
    <Tab.Screen name="GroceryList" component={GroceryList} />
    <Tab.Screen name="Pantry" component={Pantry} />
    <Tab.Screen name="Expenses" component={Expenses} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);


export default Home;
