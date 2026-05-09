import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Text,
} from "react-native";
import { useEffect, useState, useContext } from "react";

import { Seeker } from "../../components/Seeker";
import { TagsCarousel } from "../../components/TagsCarousel";
import RecipeCard from "../../components/RecipeCard";

import Context from "../../context/Context";
import Toast from "react-native-toast-message";
import { getData } from "../../services/services";
import {
  toggleSavedPetition,
  showToggleSavedToast,
} from "../../utils/toggleSavedRecipe";

import Feather from "@expo/vector-icons/Feather";

const SearchRecipes = (props) => {
  const { route, token, listRecipesTags } = useContext(Context);

  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [selectedTags, setSelectedTags] = useState(["All"]);

  const toggleTag = (selectedTag) => {
    setSelectedTags((previousSelectedTags) => {
      if (selectedTag === "All") {
        return ["All"];
      }

      const tagsWithoutAll = previousSelectedTags.filter(
        (tag) => tag !== "All",
      );

      if (tagsWithoutAll.includes(selectedTag)) {
        const selectedTagsList = tagsWithoutAll.filter(
          (tag) => tag !== selectedTag,
        );

        return selectedTagsList.length === 0 ? ["All"] : selectedTagsList;
      }

      return [...tagsWithoutAll, selectedTag];
    });
  };

  const toggleSaved = async (id) => {
    setRecipeList((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, saved: !recipe.saved } : recipe,
      ),
    );

    const result = await toggleSavedPetition({
      route,
      token,
      recipeId: id,
    });

    showToggleSavedToast(result);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getRecipesPetition();

      if (data) {
        setRecipeList(data);
        setFilteredRecipes(data);
      } else {
        Toast.show({
          type: "error",
          text1: "There was an error loading the recipes.",
          text2: "Please try again later.",
        });
      }
    }

    fetchData();
  }, []);

  const getRecipesPetition = async () => {
    const response = await getData(route + "/recipes", token);
    return response;
  };

  useEffect(() => {
    let result = [...recipeList];

    const normalizedSearch = searchText.trim().toLowerCase();

    // Filter by text
    if (normalizedSearch !== "") {
      result = result.filter((recipe) => {
        const matchesName = recipe.recipeName
          .toLowerCase()
          .includes(normalizedSearch);

        const matchesCategory = recipe.category
          .toLowerCase()
          .includes(normalizedSearch);

        const matchesIngredients = recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(normalizedSearch),
        );

        return matchesName || matchesCategory || matchesIngredients;
      });
    }

    // Filter by tags
    if (!selectedTags.includes("All")) {
      const normalizedSelectedTags = selectedTags.map((tag) =>
        tag.toLowerCase(),
      );

      result = result.filter((recipe) =>
        recipe.tags?.some((recipeTag) =>
          normalizedSelectedTags.includes(recipeTag.toLowerCase()),
        ),
      );
    }

    setFilteredRecipes(result);
  }, [searchText, selectedTags, recipeList]);

  return (
    <ImageBackground
      source={require("../../../assets/fondoApp.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <Feather
              name="chevron-left"
              size={60}
              color="rgba(75, 100, 63, 0.7)"
              onPress={() => props.navigation.goBack()}
            />
            <Seeker
              placeholderText="Search recipe..."
              value={searchText}
              onChangeText={setSearchText}
            ></Seeker>
          </View>
          <TagsCarousel
            tagsList={listRecipesTags}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
          />
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={5}
            style={{ width: "100%", marginBottom: "12%" }}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <RecipeCard
                recipe={item}
                isDetailedBox={true}
                onViewRecipe={() => props.navigation.navigate("ViewRecipe")}
                onToggleSaved={toggleSaved}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No recipes found :c</Text>
            }
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
export default SearchRecipes;
