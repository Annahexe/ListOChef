import { StyleSheet, Text, View, ImageBackground, Pressable, ScrollView, Keyboard } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Toast from "react-native-toast-message";

import RecipeCard from "../../components/RecipeCard";
import AddCircleButton from "../../components/AddCircleButton";
import { Seeker } from "../../components/Seeker";
import { TitleIconPage } from "../../components/TitleIconPage";
import { FilterOrderDropdown } from "../../components/FilterOrderDropdown";

import RecipeListTitleIcon from "../../../assets/icons/recipeList_titleIcon.svg";

import Context from "../../context/Context";
import { getData } from "../../services/services";
import { toggleSavedPetition, showToggleSavedToast } from "../../utils/toggleSavedRecipe";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

/**
 * RecipesList screen that displays the user's saved recipes.
 * Shows the last recipe seen, allows ordering recipes by date,
 * navigating to the search screen, opening a recipe detail modal,
 * creating a new recipe and toggling saved recipes.
 *
 * @param {Object} props - Navigation props.
 * @returns {JSX.Element} Recipes list screen.
 */
const RecipesList = (props) => {
  const { route, token } = useContext(Context);
  const { lastRecipeSeen, setLastRecipeSeen } = useContext(Context);

  const { recipesSaved, setRecipesSaved } = useContext(Context);

  const tabBarHeight = useBottomTabBarHeight();

  /** Stores the selected order value used to sort recipes by creation date. */
  const [filterOrderValue, setFilterOrderValue] = useState("Oldest");

  /**
   * Converts a date string into a timestamp.
   *
   * @param {string} dateString - Recipe creation date.
   * @returns {number} Date converted to milliseconds.
   */
  const toTime = (dateString) => {
    return new Date(dateString).getTime();
  };

  /**
   * Loads the user's saved recipes from the backend and stores them in context.
   */
  useEffect(() => {
    async function fetchData() {
      const data = await getUserRecipesPetition();

      if (data) {
        setRecipesSaved(data);
      }
    }

    fetchData();
  }, [recipesSaved]);

  /** Navigates to the AddRecipe modal screen. */
  const onAddRecipe = () => {
    return props.navigation.navigate("AddRecipe");
  };

  /** Navigates to the ViewRecipe modal screen. */
  const onViewRecipe = () => {
    return props.navigation.navigate("ViewRecipe");
  };

  /** Recipes sorted by creation date depending on the selected order value. */
  const sortedRecipes = [...recipesSaved].sort((a, b) => {
    const timeA = toTime(a.creationDate);
    const timeB = toTime(b.creationDate);

    if (filterOrderValue === "Oldest") {
      return timeA - timeB;
    }
    return timeB - timeA;
  });

  /**
   * Dismisses the keyboard and navigates to the recipe search screen.
   */
  const goSearchRecipe = () => {
    Keyboard.dismiss();
    return props.navigation.navigate("SearchRecipes");
  };

  /**
   * Toggles the saved state of a recipe.
   * If the backend request fails, restores the previous recipes list.
   *
   * @param {string|number} id - Recipe id to toggle.
   */
  const toggleSaved = async (id) => {
    const previousRecipes = recipesSaved;

    setRecipesSaved((prev) => prev.map((recipe) => (recipe.id === id ? { ...recipe, saved: !recipe.saved } : recipe)));

    const result = await toggleSavedPetition({
      route,
      token,
      recipeId: id,
    });

    if (result === "ERROR") {
      setRecipesSaved(previousRecipes);
    }

    showToggleSavedToast(result);
  };

  /**
   * Gets the user's saved recipes from the backend.
   *
   * @returns {Promise<Array|undefined>} List of saved recipes if the request succeeds.
   */
  const getUserRecipesPetition = async () => {
    const response = await getData(route + "/recipes/userRecipesSaved", token);
    return response;
  };

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TitleIconPage titleText="My Recipes" icon={RecipeListTitleIcon} />

          <Seeker placeholderText="Search new recipes..." onPress={goSearchRecipe} editable={false}></Seeker>

          <View style={{ flex: 1, width: "100%" }}>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={{ paddingBottom: 80 }}>
              <View style={styles.featuredRecipe}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome5 name="history" size={26} color="white" />
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      marginLeft: 10,
                      fontFamily: "InterSemiBold",
                    }}
                  >
                    Last recipe seen
                  </Text>
                </View>

                <Text style={styles.label} onPress={onViewRecipe}>
                  {lastRecipeSeen.recipeName}
                </Text>
              </View>

              <View style={styles.filterOrderContainer}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons name="calendar-blank-outline" size={28} color="black" />
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: "MontserratSemiBold",
                      marginLeft: 8,
                      marginRight: 20,
                    }}
                  >
                    Order by...
                  </Text>

                  <FilterOrderDropdown filterOrderValue={filterOrderValue} setFilterOrderValue={setFilterOrderValue} />
                </View>
              </View>

              {sortedRecipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} isDetailedBox={false} onViewRecipe={onViewRecipe} onToggleSaved={toggleSaved} />
              ))}
            </ScrollView>

            <View style={[styles.floatingButton, { bottom: tabBarHeight - 140 }]}>
              <Pressable onPress={onAddRecipe}>
                <AddCircleButton />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 235, 0.7)",
  },
  container: {
    flex: 1,
    marginTop: 50,
    position: "relative",
    alignItems: "center",
  },
  featuredRecipe: {
    width: "95%",
    borderRadius: 10,
    backgroundColor: "#4B7D33",
    padding: 15,
    margin: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 28,
    borderRadius: 10,
    backgroundColor: "#77AF5C",
    padding: 10,
    marginVertical: 10,
    color: "white",
    fontFamily: "MontserratSemiBold",
  },
  filterOrderContainer: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  pickerContainer: {
    flex: 1,
    height: 35,
    borderWidth: 1.5,
    borderColor: "#2C5818",
    borderRadius: 20,
    overflow: "hidden",
  },
  picker: {
    height: 55,
    width: "100%",
    marginTop: -12,
    paddingVertical: 0,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#4B643F",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 50,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 40,
    color: "white",
  },
  floatingButton: {
    position: "absolute",
    right: 20,
  },
});
export default RecipesList;
