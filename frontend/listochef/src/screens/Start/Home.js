import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";

import NavigationGroceryList from "../GroceryList/NavigationGroceryList";
import NavigationPantry from "../Pantry/NavigationPantry";
import NavigationExpenses from "../Expenses/NavigationExpenses";
import NavigationRecipeList from "../RecipeList/NavigationRecipeList";
import NavigationProfile from "../Profile/NavigationProfile";

import RecipeListIcon from "../../../assets/icons/recipeList_icon.svg";
import RecipeListIconActive from "../../../assets/icons/recipeList_iconActive.svg";
import GroceryListIcon from "../../../assets/icons/groceryList_icon.svg";
import GroceryListIconActive from "../../../assets/icons/groceryList_iconActive.svg";
import PantryIcon from "../../../assets/icons/pantry_icon.svg";
import PantryIconActive from "../../../assets/icons/pantry_iconActive.svg";
import ExpensesIcon from "../../../assets/icons/expenses_icon.svg";
import ExpensesIconActive from "../../../assets/icons/expenses_iconActive.svg";
import ProfileIcon from "../../../assets/icons/profile_icon.svg";
import ProfileIconActive from "../../../assets/icons/profile_iconActive.svg";

const Tab = createBottomTabNavigator();

const ICONS = {
  NavigationRecipeList: {
    active: RecipeListIconActive,
    inactive: RecipeListIcon,
  },
  NavigationGroceryList: {
    active: GroceryListIconActive,
    inactive: GroceryListIcon,
  },
  NavigationPantry: { active: PantryIconActive, inactive: PantryIcon },
  NavigationExpenses: { active: ExpensesIconActive, inactive: ExpensesIcon },
  NavigationProfile: { active: ProfileIconActive, inactive: ProfileIcon },
};

const SCREENS = [
  { name: "NavigationRecipeList", component: NavigationRecipeList },
  { name: "NavigationGroceryList", component: NavigationGroceryList },
  { name: "NavigationPantry", component: NavigationPantry },
  { name: "NavigationExpenses", component: NavigationExpenses },
  { name: "NavigationProfile", component: NavigationProfile },
];

/**
 * Main bottom tab navigator for the app.
 * Contains five tabs: RecipeList, GroceryList, Pantry, Expenses and Profile.
 * Each tab uses custom SVG icons that change between active and inactive states.
 * Labels are hidden; icon size adapts to platform (Android/iOS).
 *
 * @returns {JSX.Element} Home tab navigator.
 */
const Home = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: "#173509",
        paddingTop: Platform.OS === "android" ? 12 : 17,
        paddingBottom: Platform.OS === "android" ? 12 : 10,
        height: Platform.OS === "android" ? 100 : 80,
      },
      tabBarItemStyle: { paddingTop: 0 },
      tabBarShowLabel: false,
      tabBarIcon: ({ focused, size }) => {
        const iconSize = size * 1.5;

        const { active, inactive } = ICONS[route.name];
        const Icon = focused ? active : inactive;

        return <Icon width={iconSize} height={iconSize} />;
      },
    })}
  >
    {SCREENS.map(({ name, component }) => (
      <Tab.Screen key={name} name={name} component={component} />
    ))}
  </Tab.Navigator>
);

export default Home;
