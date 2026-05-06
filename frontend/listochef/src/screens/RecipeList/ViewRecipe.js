import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import ItemView from "../../components/ItemView";
import TitleModalScreen from "../../components/TitleModalScreen";
import Heart from "../../components/Heart";
import Context from "../../context/Context";
import {
  toggleSavedPetition,
  showToggleSavedToast,
} from "../../utils/toggleSavedRecipe";

/**
 * ViewRecipe modal screen that displays the full details of a recipe.
 * Shows photo, ingredients, category, time, difficulty and steps.
 * Allows toggling the saved/favourite state and adding ingredients to the grocery list.
 *
 * @param {Object} navigation - Navigation prop for going back.
 * @returns {JSX.Element} View Recipe modal screen.
 */
const ViewRecipe = ({ navigation }) => {
  const { route, token, lastRecipeSeen, setLastRecipeSeen } =
    useContext(Context);
  const [recipe, setRecipe] = useState();

  /** Mirrors the saved state locally for optimistic UI updates. */
  const [isSaved, setIsSaved] = useState(recipe?.isSaved ?? false);

  // Loads the last seen recipe from context on mount
  useEffect(() => {
    setRecipe(lastRecipeSeen);
  }, []);

  /** Navigates back (used for "Add to grocery list" action). */
  const onAddGroceryList = () => {
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
        <TitleModalScreen
          title={recipe.recipeName}
          onPress={() => navigation.goBack()}
          size={25}
        />

        <ScrollView style={styles.scrollContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.mainImage}
              source={{
                uri: recipe.photo,
              }}
            ></Image>
            <Heart
              colorHeart={recipe.saved ? "red" : "white"}
              stiles={"onImage"}
              onPress={() => onToggleSaved()}
            />
          </View>
          <ItemView
            label={"Ingredients"}
            ingredients={recipe.ingredients}
          ></ItemView>

          <Pressable
            onPress={onAddGroceryList}
            style={[styles.button, { borderRadius: 22 }]}
          >
            <Text style={styles.textButton}>Add to grocery list</Text>
          </Pressable>

          <View style={styles.multipleLines}>
            <ItemView
              label={"Category"}
              info={recipe.category}
              style={{ flex: 1 }}
            ></ItemView>
            <ItemView
              label={"Time"}
              time={recipe.time}
              style={{ flex: 1 }}
            ></ItemView>
            <ItemView
              label={"Difficulty"}
              info={recipe.difficulty}
              style={{ flex: 1 }}
            ></ItemView>
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
  button: {
    margin: 10,
    backgroundColor: "#4B643F",
    padding: 10,
    borderRadius: 8,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
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
