import { StyleSheet, View, ImageBackground, FlatList, Text } from "react-native";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { Seeker } from "../../components/Seeker";
import { TagsCarousel } from "../../components/TagsCarousel";
import { ListItem } from "../../components/ListItem";
import { buildIngredientsDiff } from "../../utils/buildIngredientsDiff";
import { getData, postDataToken } from "../../services/services";

import Context from "../../context/Context";

import Feather from "@expo/vector-icons/Feather";

/**
 * AddProduct screen that allows the user to add ingredients to the grocery list.
 * Displays all available ingredients from the backend and allows filtering by
 * search text and ingredient tags. Grocery list changes are stored locally while
 * the user is on the screen and synced with the backend when leaving the screen.
 *
 * @param {Object} props - Navigation props.
 * @returns {JSX.Element} Add Product screen.
 */
const AddProduct = (props) => {
  const { route, token } = useContext(Context);

  const { ingredientTags } = useContext(Context);
  const [selectedTags, setSelectedTags] = useState(["All"]);

  const [ingredientsList, setIngredientsList] = useState([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const { selectedIngredients, setSelectedIngredients } = useContext(Context);

  const [filteredIngredientsList, setFilteredIngredientsList] = useState([]);
  const [searchText, setSearchText] = useState("");

  /**
   * Stores the grocery list state when entering the screen.
   * Used later to calculate changes before syncing with the backend.
   */
  const initialSelectedRef = useRef([]);

  /**
   * Stores the latest grocery list state without depending directly on focus callbacks.
   */
  const latestSelectedRef = useRef(selectedIngredients);

  /**
   * Keeps latestSelectedRef synchronized with the current selectedIngredients context.
   */
  useEffect(() => {
    latestSelectedRef.current = selectedIngredients;
  }, [selectedIngredients]);

  /**
   * Loads all available ingredients from the backend when the screen mounts.
   * Stores the list so it can later be filtered by search text and tags.
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
    };

    loadIngredients();
  }, [route, token]);

  /**
   * Sends grocery list changes to the backend.
   * If there are no changes, the request is skipped.
   *
   * @param {Array} changes - List of added, updated or removed ingredients.
   */
  const syncSelectedIngredients = useCallback(
    async (changes) => {
      if (changes.length === 0) {
        return;
      }

      try {
        const response = await postDataToken(route + "/updateGroceryList", changes, token);

        if (!response) {
          Toast.show({
            type: "error",
            text1: "Error syncing grocery list!",
            text2: "Please try again later.",
          });

          return;
        }
      } catch (error) {
        console.error("Error syncing grocery list:", error);

        Toast.show({
          type: "error",
          text1: "Error syncing grocery list!",
          text2: "Please try again later.",
        });
      }
    },
    [route, token],
  );

  /**
   * Saves a grocery list snapshot when the screen is focused.
   * When leaving the screen, compares the initial and latest grocery list state
   * and syncs only the changes with the backend.
   */
  useFocusEffect(
    useCallback(() => {
      // snapshot when entering / focusing the screen
      initialSelectedRef.current = [...latestSelectedRef.current];

      return () => {
        // compare when leaving the screen
        const changes = buildIngredientsDiff(initialSelectedRef.current, latestSelectedRef.current);

        syncSelectedIngredients(changes);
      };
    }, [syncSelectedIngredients]),
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
   * Adds an ingredient to the grocery list with an initial amount of 1.
   * If the ingredient already exists in the grocery list, it does not add it again.
   *
   * @param {Object} ingredient - Ingredient selected by the user.
   */
  const selectIngredient = (ingredient) => {
    setSelectedIngredients((prev) => {
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
   * Removes an ingredient from the grocery list.
   *
   * @param {string} ingredientName - Name of the ingredient to remove.
   */
  const unselectIngredient = (ingredientName) => {
    setSelectedIngredients((prev) => prev.filter((item) => item.ingredientName !== ingredientName));
  };

  /**
   * Increments the amount of a grocery list ingredient by 1.
   *
   * @param {string} ingredientName - Name of the ingredient to update.
   */
  const addAmount = (ingredientName) => {
    setSelectedIngredients((prev) =>
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
   * Decrements the amount of a grocery list ingredient by 1.
   * If the amount reaches 0, the ingredient is removed from the grocery list.
   *
   * @param {string} ingredientName - Name of the ingredient to update.
   */
  const subtractAmount = (ingredientName) => {
    setSelectedIngredients((prev) =>
      prev
        .map((item) =>
          item.ingredientName === ingredientName
            ? {
                ...item,
                ingredientAmount: item.ingredientAmount - 1,
              }
            : item,
        )
        .filter((item) => item.ingredientAmount > 0),
    );
  };

  /**
   * Checks whether an ingredient is already selected in the grocery list.
   *
   * @param {string} ingredientName - Name of the ingredient to check.
   * @returns {boolean} True if the ingredient exists in the grocery list.
   */
  const isIngredientSelected = (ingredientName) => {
    return selectedIngredients.some((item) => item.ingredientName === ingredientName);
  };

  /**
   * Gets the current amount of an ingredient in the grocery list.
   *
   * @param {string} ingredientName - Name of the ingredient to check.
   * @returns {number} Ingredient amount, or 0 if it is not selected.
   */
  const getIngredientAmount = (ingredientName) => {
    const ingredient = selectedIngredients.find((item) => item.ingredientName === ingredientName);

    return ingredient ? ingredient.ingredientAmount : 0;
  };

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
      result = result.filter((ingredient) => {
        return ingredient.ingredientName.toLowerCase().includes(normalizedSearch);
      });
    }

    // Filter by tags
    if (!selectedTags.includes("All")) {
      result = result.filter((ingredient) => selectedTags.map((tag) => tag.toLowerCase()).includes(ingredient.ingredientTag.toLowerCase()));
    }

    setFilteredIngredientsList(result);
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
            data={filteredIngredientsList}
            keyExtractor={(item) => item.ingredientName}
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
export default AddProduct;
