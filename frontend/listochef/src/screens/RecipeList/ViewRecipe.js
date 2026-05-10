import { View, Text, Pressable, StyleSheet, ScrollView, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import ItemView from "../../components/ItemView";
import TitleModalScreen from "../../components/TitleModalScreen";
import Heart from "../../components/Heart";
import PrimaryButton from "../../components/PrimaryButton";
import Context from "../../context/Context";
import Toast from "react-native-toast-message";
import { postDataToken, getData } from "../../services/services";
import { toggleSavedPetition, showToggleSavedToast } from "../../utils/toggleSavedRecipe";

/**
 * ViewRecipe modal screen that displays the full details of a recipe.
 * Shows photo, ingredients, category, time, difficulty and steps.
 * Allows toggling the saved/favourite state and adding ingredients to the grocery list.
 *
 * @param {Object} navigation - Navigation prop for going back.
 * @returns {JSX.Element} View Recipe modal screen.
 */
const ViewRecipe = ({ navigation }) => {
  const { route, token, lastRecipeSeen, setLastRecipeSeen, selectedIngredients, setSelectedIngredients } = useContext(Context);
  const [recipe, setRecipe] = useState();

  /** Mirrors the saved state locally for optimistic UI updates. */
  const [isSaved, setIsSaved] = useState(recipe?.isSaved ?? false);

  //Sets state loading for saving the ingredients
  const [isLoading, setIsLoading] = useState(false);

  // Loads the last seen recipe from context on mount
  useEffect(() => {
    setRecipe(lastRecipeSeen);
  }, []);

  /**
   * Adds the recipe's ingredients to the grocery list.
   * If an ingredient already exists in the list, increments its amount by 1.
   * If it doesn't exist, fetches its tag from the backend and adds it as a new entry.
   * Syncs the updated list with the backend via /updateGroceryList.
   * Navigates back after the operation completes.
   *
   * @returns {Promise<void>}
   */
  const onAddGroceryList = async () => {
    setIsLoading(true);
    const allIngredients = await getData(route + "/ingredients", token);

    const newIngredients = [];
    const updatedList = [...selectedIngredients];

    recipe.ingredients.forEach((name) => {
      const existingIndex = updatedList.findIndex((i) => i.ingredientName === name);

      if (existingIndex !== -1) {
        // Ya existe, le sumamos 1
        updatedList[existingIndex] = {
          ...updatedList[existingIndex],
          ingredientAmount: updatedList[existingIndex].ingredientAmount + 1,
        };
      } else {
        // No existe, lo añadimos nuevo
        const found = allIngredients?.find((i) => i.ingredientName === name);
        const newItem = {
          ingredientName: name,
          ingredientTag: found?.ingredientTag ?? "",
          ingredientAmount: 1,
        };
        updatedList.push(newItem);
        newIngredients.push(newItem);
      }
    });

    setSelectedIngredients(updatedList);

    const changes = updatedList
      .filter((i) => recipe.ingredients.includes(i.ingredientName))
      .map((i) => ({
        ingredientName: i.ingredientName,
        ingredientAmount: i.ingredientAmount,
        action: "add",
      }));

    if (changes.length > 0) {
      await postDataToken(route + "/updateGroceryList", changes, token);
    }
    setIsLoading(false);

    Toast.show({
      type: "success",
      text1: "Ingredients added to grocery list!",
    });

    return navigation.goBack();
  };

  if (!recipe) return null;

  /**
   * Toggles the saved/favourite state locally and syncs with backend.
   * Updates both local state and context optimistically.
   */
  const onToggleSaved = async () => {
    setIsSaved((prev) => !prev);
    setRecipe((prev) => ({ ...prev, saved: !prev.saved }));
    setLastRecipeSeen((prev) => ({ ...prev, saved: !prev.saved }));

    const result = await toggleSavedPetition({
      route,
      token,
      recipeId: recipe.id,
    });

    showToggleSavedToast(result);
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <TitleModalScreen title={recipe.recipeName} onPress={() => navigation.goBack()} size={25} />

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.mainImage}
              source={{
                uri: recipe.photo,
              }}
            ></Image>
            <Heart colorHeart={recipe.saved ? "red" : "white"} stiles={"onImage"} onPress={() => onToggleSaved()} />
          </View>
          <ItemView label={"Ingredients"} ingredients={recipe.ingredients}></ItemView>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              buttonText="Add to grocery list"
              onPress={onAddGroceryList}
              isLoading={isLoading}
              buttonStyle={{ width: "100%", margin: 0 }}
              containerStyle={{ width: "100%" }}
            />
          </View>

          <View style={styles.multipleLines}>
            <ItemView label={"Category"} info={recipe.category} style={{ flex: 1 }}></ItemView>
            <ItemView label={"Time"} time={recipe.time} style={{ flex: 1 }}></ItemView>
            <ItemView label={"Difficulty"} info={recipe.difficulty} style={{ flex: 1 }}></ItemView>
          </View>

          <ItemView label={"Steps to create"} info={recipe.steps}></ItemView>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center", // o flex-end si quieres tipo bottom sheet
    padding: 20,
    paddingVertical: 50,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 2,
    overflow: "hidden",
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: "1",
  },
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 2,
    marginVertical: 15,
    paddingBottom: 20,
    marginBottom: 0,
  },
  textButton: {
    fontSize: 25,
    fontFamily: "InterBold",
    color: "white",
    textAlign: "center",
  },
  mainImage: {
    borderRadius: 15,
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  multipleLines: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ViewRecipe;
