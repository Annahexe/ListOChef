import { StyleSheet, View, ImageBackground, FlatList, Text } from "react-native";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { Seeker } from "../../components/Seeker";
import { TagsCarousel } from "../../components/TagsCarousel";
import { ListItem } from "../../components/ListItem";
import { getData } from "../../services/services";
import { updatePantryListPetition } from "../../utils/pantryListUtils";

import Context from "../../context/Context";
import Feather from "@expo/vector-icons/Feather";

/**
 * AddPantry screen that allows the user to add ingredients to their pantry.
 * Displays all available ingredients from the backend and allows filtering by
 * search text and ingredient tags. Pantry changes are stored locally while the
 * user is on the screen and synced with the backend when leaving the screen.
 *
 * @param {Object} props - Navigation props.
 * @returns {JSX.Element} Add Pantry screen.
 */
const AddPantry = (props) => {
  const { route, token } = useContext(Context);

  const { ingredientTags } = useContext(Context);
  const [selectedTags, setSelectedTags] = useState(["All"]);

  const [ingredientsList, setIngredientsList] = useState([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const { pantryItems, setPantryItems } = useContext(Context);

  const [filteredPantryItemsList, setFilteredPantryItemsList] = useState([]);
  const [searchText, setSearchText] = useState("");

  /**
   * Stores the pantry state when entering the screen.
   * Used later to check if changes were made before syncing with the backend.
   */
  const initialPantryRef = useRef([]);

  /**
   * Stores the latest pantry state without depending directly on screen focus callbacks.
   */
  const latestPantryRef = useRef(pantryItems);

  /**
   * Keeps latestPantryRef synchronized with the current pantryItems context.
   */
  useEffect(() => {
    latestPantryRef.current = pantryItems;
  }, [pantryItems]);

  /**
   * Sends the updated pantry list to the backend.
   *
   * @param {Array} updatedPantryItems - Updated list of pantry ingredients.
   */
  const syncPantryItems = useCallback(
    async (updatedPantryItems) => {
      const wasUpdated = await updatePantryListPetition({
        route,
        token,
        pantryItems: updatedPantryItems,
      });

      if (!wasUpdated) {
        return;
      }
    },
    [route, token],
  );

  /**
   * Saves a pantry snapshot when the screen is focused.
   * When leaving the screen, compares the initial and latest pantry state.
   * If changes exist, syncs the pantry with the backend.
   */
  useFocusEffect(
    useCallback(() => {
      initialPantryRef.current = [...latestPantryRef.current];

      return () => {
        const initialPantry = initialPantryRef.current;
        const latestPantry = latestPantryRef.current;

        const hasChanged = JSON.stringify(initialPantry) !== JSON.stringify(latestPantry);

        if (!hasChanged) {
          return;
        }

        syncPantryItems(latestPantry);
      };
    }, [syncPantryItems]),
  );

  /**
   * Toggles a selected ingredient tag.
   * If "All" is selected, clears all other selected tags.
   * If the last selected tag is removed, returns to "All".
   *
   * @param {string} selectedTag - Tag selected by the user.
   */
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

  /**
   * Adds an ingredient to the pantry with an initial amount of 1.
   * If the ingredient already exists in the pantry, it does not add it again.
   *
   * @param {Object} ingredient - Ingredient selected by the user.
   */
  const selectIngredient = (ingredient) => {
    setPantryItems((prev) => {
      const alreadyExists = prev.find((item) => item.ingredientName === ingredient.ingredientName);

      if (alreadyExists) return prev;

      return [
        ...prev,
        {
          ingredientName: ingredient.ingredientName,
          ingredientTag: ingredient.ingredientTag,
          ingredientAmount: 1,
        },
      ];
    });
  };

  /**
   * Removes an ingredient from the pantry.
   *
   * @param {string} ingredientName - Name of the ingredient to remove.
   */
  const unselectIngredient = (ingredientName) => {
    setPantryItems((prev) => prev.filter((item) => item.ingredientName !== ingredientName));
  };

  /**
   * Increments the amount of a pantry ingredient by 1.
   *
   * @param {string} ingredientName - Name of the ingredient to update.
   */
  const addAmount = (ingredientName) => {
    setPantryItems((prev) =>
      prev.map((item) =>
        item.ingredientName === ingredientName
          ? {
              ...item,
              ingredientAmount: item.ingredientAmount + 1,
            }
          : item,
      ),
    );
  };

  /**
   * Decrements the amount of a pantry ingredient by 1.
   * If the amount reaches 0, the ingredient is removed from the pantry.
   *
   * @param {string} ingredientName - Name of the ingredient to update.
   */
  const subtractAmount = (ingredientName) => {
    setPantryItems((prev) =>
      prev
        .map((item) => (item.ingredientName === ingredientName ? { ...item, ingredientAmount: item.ingredientAmount - 1 } : item))
        .filter((item) => item.ingredientAmount > 0),
    );
  };

  /**
   * Checks whether an ingredient is already selected in the pantry.
   *
   * @param {string} ingredientName - Name of the ingredient to check.
   * @returns {boolean} True if the ingredient exists in the pantry.
   */
  const isIngredientSelected = (ingredientName) => {
    return pantryItems.some((item) => item.ingredientName === ingredientName);
  };

  /**
   * Gets the current amount of an ingredient in the pantry.
   *
   * @param {string} ingredientName - Name of the ingredient to check.
   * @returns {number} Ingredient amount, or 0 if it is not selected.
   */
  const getIngredientAmount = (ingredientName) => {
    const ingredient = pantryItems.find((item) => item.ingredientName === ingredientName);

    return ingredient ? ingredient.ingredientAmount : 0;
  };

  /**
   * Loads all available ingredients from the backend when the screen mounts.
   * Initializes both the full ingredient list and the filtered list.
   */
  useEffect(() => {
    const loadIngredients = async () => {
      setIsLoadingIngredients(true);

      const ingredients = await getData(route + "/ingredients", token);

      setIsLoadingIngredients(false);

      if (!ingredients) {
        Toast.show({
          type: "error",
          text1: "Error loading ingredients!",
          text2: "Please try again later.",
        });

        return;
      }

      if (!Array.isArray(ingredients)) {
        Toast.show({
          type: "error",
          text1: "Error loading ingredients!",
          text2: "Invalid response.",
        });

        return;
      }

      setIngredientsList(ingredients);
      setFilteredPantryItemsList(ingredients);
    };

    loadIngredients();
  }, [route, token]);

  /**
   * Filters ingredients whenever the search text, selected tags or ingredient list change.
   * The text filter checks the ingredient name.
   * The tag filter checks the ingredient category/tag.
   */
  useEffect(() => {
    let result = [...ingredientsList];

    const normalizedSearch = searchText.trim().toLowerCase();

    // Filter by text
    if (normalizedSearch !== "") {
      result = result.filter((ingredient) => ingredient.ingredientName.toLowerCase().includes(normalizedSearch));
    }

    // Filter by tags
    if (!selectedTags.includes("All")) {
      result = result.filter((ingredient) => selectedTags.map((tag) => tag.toLowerCase()).includes(ingredient.ingredientTag.toLowerCase()));
    }

    setFilteredPantryItemsList(result);
  }, [searchText, selectedTags, ingredientsList]);

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <Feather name="chevron-left" size={60} color="rgba(75, 100, 63, 0.7)" onPress={() => props.navigation.goBack()} />
            <Seeker placeholderText="Search new products..." value={searchText} onChangeText={setSearchText}></Seeker>
          </View>
          <TagsCarousel tagsList={ingredientTags} selectedTags={selectedTags} onToggleTag={toggleTag} />
          <FlatList
            data={filteredPantryItemsList}
            keyExtractor={(item) => item.id || item.ingredientName}
            style={{ width: "100%", marginBottom: "12%" }}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <ListItem
                ingredient={item.ingredientName}
                isSelected={isIngredientSelected(item.ingredientName)}
                amount={getIngredientAmount(item.ingredientName)}
                onSelect={() => selectIngredient(item)}
                onUnselect={() => unselectIngredient(item.ingredientName)}
                onAddAmount={() => addAmount(item.ingredientName)}
                onSubtractAmount={() => subtractAmount(item.ingredientName)}
              />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>{isLoadingIngredients ? "Loading ingredients..." : "No ingredients found."}</Text>}
          />
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
    padding: 5,
    marginTop: 45,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
    color: "#4B643F",
    fontFamily: "MontserratSemiBold",
  },
});

export default AddPantry;
