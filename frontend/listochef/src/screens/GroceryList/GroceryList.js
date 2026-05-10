import { StyleSheet, Text, View, ImageBackground, Pressable, ScrollView, Keyboard, Alert } from "react-native";
import { useState, useContext } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Feather from "@expo/vector-icons/Feather";
import AddCircleButton from "../../components/AddCircleButton";
import { GroceryListItem } from "../../components/GroceryListItem";
import GroceryListTitleIcon from "../../../assets/icons/groceryList_titleIcon.svg";
import { TitleIconPage } from "../../components/TitleIconPage";
import { Seeker } from "../../components/Seeker";
import PrimaryButton from "../../components/PrimaryButton";
import { TagsCarousel } from "../../components/TagsCarousel";
import { postDataToken } from "../../services/services";
import Toast from "react-native-toast-message";
import { buildUpdatedPantryList, updatePantryListPetition } from "../../utils/pantryListUtils";
import Context from "../../context/Context";

/**
 * GroceryList screen that displays the user's grocery list with tag filtering.
 * Allows adding products, selecting items to move to the pantry, and deleting items.
 *
 * @param {Object} props - Navigation props.
 * @returns {JSX.Element} Grocery List screen.
 */
const GroceryList = (props) => {
  const { route, token, ingredientTags, selectedIngredients, setSelectedIngredients, pantryItems, setPantryItems } = useContext(Context);
  const [selectedTags, setSelectedTags] = useState(["All"]);
  const [isLoading, setIsLoading] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();

  // Local list of ingredients selected to be moved to pantry
  const [ingredientsToPantry, setIngredientsToPantry] = useState([]);

  /** "Add to Pantry" button is disabled when no ingredients are selected. */
  const isDisabled = ingredientsToPantry.length === 0;

  const toggleTag = (selectedTag) => {
    setSelectedTags((previousSelectedTags) => {
      if (selectedTag == "All") {
        return ["All"];
      }
      const tagsWithoutAll = previousSelectedTags.filter((element) => element !== "All");
      if (tagsWithoutAll.includes(selectedTag)) {
        const selectedTagsList = tagsWithoutAll.filter((element) => element !== selectedTag);
        return selectedTagsList.length === 0 ? ["All"] : selectedTagsList;
      }
      return [...tagsWithoutAll, selectedTag];
    });
  };

  /** Navigates to AddProduct screen. */
  const goAddProduct = () => {
    Keyboard.dismiss();
    return props.navigation.navigate("AddProduct");
  };

  /** Adds an ingredient to the pantry selection list. @param {Object} item */
  const onSelect = (item) => {
    setIngredientsToPantry((prev) => [...prev, item]);
  };

  /** Removes an ingredient from the pantry selection list. @param {Object} item */
  const unSelect = (item) => {
    setIngredientsToPantry((prev) => prev.filter((i) => i.ingredientName !== item.ingredientName));
  };

  /** Returns true if the ingredient is currently selected. @param {Object} item */
  const isItemSelected = (item) => {
    return ingredientsToPantry.some((i) => i.ingredientName === item.ingredientName);
  };
  /**
   * Deletes all currently selected ingredients from the grocery list.
   * Removes them from both the grocery list context and the pantry selection.
   */
  const deleteSelected = () => {
    Alert.alert("Delete ingredients", `Remove ${ingredientsToPantry.length} selected ingredients?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          for (const item of ingredientsToPantry) {
            await removeFromGroceryListPetition(item.ingredientName);
          }

          setSelectedIngredients((prev) => prev.filter((i) => !ingredientsToPantry.some((s) => s.ingredientName === i.ingredientName)));

          setIngredientsToPantry([]);

          Toast.show({
            type: "success",
            text1: "Ingredients deleted!",
          });
        },
      },
    ]);
  };

  /**
   * Moves selected ingredients to the pantry, updates context,
   * removes them from the grocery list, and clears the selection.
   */
  const addToPantry = async () => {
    setIsLoading(true);
    const updatedPantryItems = buildUpdatedPantryList(pantryItems, ingredientsToPantry);

    const wasPantryUpdated = await updatePantryListPetition({
      route,
      token,
      pantryItems: updatedPantryItems,
    });

    setIsLoading(false);

    if (!wasPantryUpdated) {
      Toast.show({
        type: "error",
        text1: "Error adding to pantry.",
        text2: "Please try again later.",
      });
      return;
    }

    setPantryItems(updatedPantryItems);

    setSelectedIngredients((prev) => prev.filter((item) => !ingredientsToPantry.some((i) => i.ingredientName === item.ingredientName)));
    setIngredientsToPantry([]);

    Toast.show({
      type: "success",
      text1: "Added to pantry!",
    });
  };

  /**
   * Shows a confirmation alert before deleting an ingredient.
   * Removes it from both the grocery list and the pantry selection.
   * @param {Object} item - Ingredient to delete.
   */
  const onDelete = (item) => {
    Alert.alert("Delete ingredient", `Remove ${item.ingredientName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setSelectedIngredients((prev) => prev.filter((i) => i.ingredientName !== item.ingredientName));

          setIngredientsToPantry((prev) => prev.filter((i) => i.ingredientName !== item.ingredientName));
          const respone = await removeFromGroceryListPetition(item.ingredientName);
        },
      },
    ]);
  };

  /**
   * Sends a request to remove an ingredient from the grocery list in the backend.
   * @param {string} ingredientName
   * @returns {Promise<boolean>} True if successful, false otherwise.
   */
  const removeFromGroceryListPetition = async (ingredientName) => {
    const data = { ingredientName: ingredientName };

    const response = await postDataToken(route + "/removeFromGroceryList", data, token);

    if (!response) {
      Toast.show({
        type: "error",
        text1: "Error removing ingredient!",
        text2: "Please try again later.",
      });

      return false;
    }

    console.log("Ingredient removed from grocery list:", response);
    return true;
  };

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TitleIconPage titleText="Grocery List" icon={GroceryListTitleIcon} />

          <Seeker placeholderText="Search new products..." onPress={goAddProduct} editable={false}></Seeker>
          <TagsCarousel tagsList={ingredientTags} selectedTags={selectedTags} onToggleTag={toggleTag} />

          <View style={styles.resumeRow}>
            <Text style={[styles.resumeText, { flex: 1 }]}>{selectedIngredients.length} products</Text>
            {!isDisabled && <Feather name="trash-2" size={24} color="#c0392b" onPress={deleteSelected} />}
          </View>
          <View style={{ flex: 1, width: "100%", maxHeight: "55%" }}>
            <ScrollView>
              {selectedIngredients.map((item, index) => (
                <GroceryListItem
                  key={item.ingredientName}
                  ingredient={item.ingredientName}
                  amount={item.ingredientAmount}
                  isSelected={isItemSelected(item)}
                  onSelect={() => onSelect(item)}
                  onUnselect={() => unSelect(item)}
                  onDelete={() => onDelete(item)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={[styles.floatingButton, { bottom: tabBarHeight - 140 }]}>
            <PrimaryButton
              buttonText="Add to Pantry"
              onPress={addToPantry}
              isLoading={isLoading}
              isDisabled={isDisabled}
              buttonStyle={[styles.buttonPantry, isDisabled && styles.buttonDisabled]}
            />
            <Pressable onPress={goAddProduct}>
              <AddCircleButton />
            </Pressable>
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
  resumeText: {
    marginVertical: 10,
    fontSize: 20,
    fontFamily: "InterBold",
    alignSelf: "flex-start",
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    flexDirection: "row",
  },
  buttonPantry: {
    position: "absolute",
    top: 40,
    right: 0,
    color: "white",
    fontFamily: "InterMedium",
    fontSize: 18,
    borderRadius: 25,
    backgroundColor: "#4B643F",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 3,
  },
  buttonDisabled: {
    backgroundColor: "#8b9d89",
    opacity: 0.6,
    shadowOpacity: 0,
  },
  resumeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginVertical: 2,
    marginHorizontal: 10,
    width: "90%",
  },
});
export default GroceryList;
