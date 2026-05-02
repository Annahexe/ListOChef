import { StyleSheet, View, ImageBackground, FlatList, Text } from "react-native";
import { useEffect, useState, useContext } from "react";

import { Seeker } from "../../components/Seeker";
import { TagsCarousel } from "../../components/TagsCarousel";
import RecipeCard from "../../components/RecipeCard";

import Context from "../../context/Context";
import Toast from "react-native-toast-message";
import { getData, postDataToken } from "../../services/services";

import Feather from "@expo/vector-icons/Feather";

const SearchRecipes = (props) => {
  const { route, token } = useContext(Context);

  const [recipeList, setRecipeList] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const TOGGLE_SAVED_STATUS = {
    SAVED: "SAVED",
    REMOVED: "REMOVED",
    ERROR: "ERROR",
  };

  //THESE TAGS SHOULD BE FROM BACKEND, FOR EXAMPLE const TAGS = ["All", ...listRecipesTags];
  const TAGS = [
    { name: "All", icon: "" },
    { name: "Pasta", icon: "🍝" },
    { name: "Fish", icon: "🐟" },
    { name: "Pork", icon: "🐖" },
    { name: "Beef", icon: "🐄" },
    { name: "Chicken", icon: "🐔" },
    { name: "Meat", icon: "🥩" },
  ];

  const [selectedTags, setSelectedTags] = useState(["All"]);

  const toggleTag = (selectedTag) => {
    setSelectedTags((previousSelectedTags) => {
      if (selectedTag === "All") {
        return ["All"];
      }

      const tagsWithoutAll = previousSelectedTags.filter((tag) => tag !== "All");

      if (tagsWithoutAll.includes(selectedTag)) {
        const selectedTagsList = tagsWithoutAll.filter((tag) => tag !== selectedTag);

        return selectedTagsList.length === 0 ? ["All"] : selectedTagsList;
      }

      return [...tagsWithoutAll, selectedTag];
    });
  };

  const toggleSaved = async (id) => {
    setRecipeList((prev) => prev.map((recipe) => (recipe.id === id ? { ...recipe, saved: !recipe.saved } : recipe)));

    const result = await toggleSavedPetition(id);

    if (result === TOGGLE_SAVED_STATUS.SAVED) {
      Toast.show({
        type: "success",
        text1: "Successfully saved recipe.",
      });
    } else if (result === TOGGLE_SAVED_STATUS.REMOVED) {
      Toast.show({
        type: "error",
        text1: "Removed from saved recipes.",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Could not update saved recipe.",
      });
    }
  };

  //demo data
  useEffect(() => {
    console.log("USE EFFECT AQUI");

    async function fetchData() {
      console.log("FETCHING DATA");
      const data = await getRecipesPetition();
      console.log(data);

      if (data) {
        console.log("IF DATA SI");
        setRecipeList(data);
        setFilteredRecipes(data);
      }
    }

    fetchData();
  }, []);

  const getRecipesPetition = async () => {
    console.log("ENVIO PETICION");
    const response = await getData(route + "/recipes", token);
    return response;
  };

  const toggleSavedPetition = async (id) => {
    const dataIdRecipe = { recipeId: id };
    const response = await postDataToken(route + "/toggleSaved", dataIdRecipe, token);

    if (!response) return TOGGLE_SAVED_STATUS.ERROR;

    const [status, jsonResponse] = response;

    if (status === 200) {
      console.log("RECEIVED RESPONSE FROM TOGGLE SAVED: ", jsonResponse);

      if (jsonResponse === "saved:true") return TOGGLE_SAVED_STATUS.SAVED;
      if (jsonResponse === "saved:false") return TOGGLE_SAVED_STATUS.REMOVED;
    }

    return TOGGLE_SAVED_STATUS.ERROR;
  };

  // const recipesData = [
  //   {
  //     id: "1",
  //     recipeName: "Spaghetti Bolognese",
  //     ingredients: ["Pasta", "Tomato Sauce", "Minced meat", "Oil", "Spices", "Onion", "Cheese"],
  //     tag: ["pasta", "meat"],
  //     category: "Lunch",
  //     time: 20,
  //     difficulty: "Low",
  //     steps:
  //       "1. Heat water in a pot. \n2. Add oil to a frying pan. Medium heat.  \n3. Add salt and the ground meat. Stir with a spatula.  \n4. Add chopped onion to the frying pan. Stir.  \n5. When the water boils, add salt and your choice of pasta. Don't forget to stir the pasta with a spoon.  \n6. When the meat is cooked and the onion is golden brown, add tomato sauce. Add salt to balance the acidity and spices to taste.  \n7. When the pasta is al dente, drain it in a colander and add it to the frying pan. Stir.",
  //     photo: "https://supervalu.ie/image/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
  //     creationDate: "17/02/2026",
  //     isSaved: true,
  //   },
  //   {
  //     id: "2",
  //     recipeName: "Paella",
  //     ingredients: ["Rice", "Chicken", "Seafood", "Bell pepper", "Onion", "Garlic", "Olive oil", "Paprika", "Saffron", "Salt", "Stock"],
  //     tag: ["rice", "seafood"],
  //     category: "Lunch",
  //     time: 45,
  //     difficulty: "Medium",
  //     steps:
  //       "1. Heat olive oil in a wide pan over medium heat. \n2. Add chopped onion, garlic and bell pepper. Stir until soft.  \n3. Add the chicken and cook until lightly browned.  \n4. Add the rice and stir for one minute.  \n5. Add paprika, saffron, salt and hot stock. Stir gently.  \n6. Cook without stirring for about 15 minutes.  \n7. Add the seafood and cook for another 10 minutes until everything is done.",
  //     photo: "https://e00-xlk-cooking-elmundo.uecdn.es/files/article_main_microformat_4_3/uploads/2023/02/28/63fe82e0ba614.jpeg",
  //     creationDate: "17/02/2026",
  //     isSaved: false,
  //   },
  //   {
  //     id: "3",
  //     recipeName: "Bolognese Sauce",
  //     ingredients: ["Minced meat", "Tomato sauce", "Onion", "Garlic", "Olive oil", "Salt", "Pepper", "Spices"],
  //     tag: ["sauce", "meat"],
  //     category: "Lunch",
  //     time: 40,
  //     difficulty: "Low",
  //     steps:
  //       "1. Heat olive oil in a frying pan over medium heat. \n2. Add chopped onion and garlic. Stir until soft.  \n3. Add the minced meat and cook until browned.  \n4. Add salt, pepper and spices to taste.  \n5. Pour in the tomato sauce and stir well.  \n6. Reduce heat and let it simmer for about 20 minutes, stirring occasionally.",
  //     photo: "https://www.healthyfood.com/wp-content/uploads/2016/11/Bolognese-sauce-iStock-485714898.jpg",
  //     creationDate: "17/02/2026",
  //     isSaved: false,
  //   },
  //   {
  //     id: "4",
  //     recipeName: "Gnocchi Bolognese",
  //     ingredients: ["Gnocchi", "Minced meat", "Tomato sauce", "Onion", "Olive oil", "Salt", "Spices", "Cheese"],
  //     tag: ["pasta", "meat"],
  //     category: "Lunch",
  //     time: 25,
  //     difficulty: "Low",
  //     steps:
  //       "1. Heat olive oil in a frying pan over medium heat. \n2. Add chopped onion and cook until soft.  \n3. Add the minced meat and cook until browned.  \n4. Add tomato sauce, salt and spices. Stir and let it cook for 10 minutes.  \n5. Boil water in a pot and cook the gnocchi according to the package instructions.  \n6. Drain the gnocchi and add them to the frying pan.  \n7. Mix well and serve with cheese on top.",
  //     photo: "https://www.eatclub.de/wp-content/uploads/2024/01/gnocchi-bolognese.jpg",
  //     creationDate: "17/02/2026",
  //     isSaved: true,
  //   },
  //   {
  //     id: "5",
  //     recipeName: "Potato Omelette",
  //     ingredients: ["Potatoes", "Eggs", "Onion", "Olive oil", "Salt"],
  //     tag: ["eggs", "potato"],
  //     category: "Dinner",
  //     time: 20,
  //     difficulty: "Low",
  //     steps:
  //       "1. Peel and slice the potatoes. \n2. Heat olive oil in a frying pan over medium heat.  \n3. Add the potatoes and onion and cook slowly until soft.  \n4. Beat the eggs in a bowl and add salt.  \n5. Drain the potatoes and mix them with the eggs.  \n6. Pour the mixture into the pan and cook until set on both sides.",
  //     photo: "https://mojo.generalmills.com/api/public/content/9xIHKwJDH0-1wbHPsVCCVQ_gmi_hi_res_jpeg.jpeg?v=2bfc22c6&t=16e3ce250f244648bef28c5949fb99ff",
  //     creationDate: "17/02/2026",
  //     isSaved: true,
  //   },
  // ];

  useEffect(() => {
    let result = [...recipeList];

    const normalizedSearch = searchText.trim().toLowerCase();

    // Filter by text
    if (normalizedSearch !== "") {
      result = result.filter((recipe) => {
        const matchesName = recipe.recipeName.toLowerCase().includes(normalizedSearch);

        const matchesCategory = recipe.category.toLowerCase().includes(normalizedSearch);

        const matchesIngredients = recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(normalizedSearch));

        return matchesName || matchesCategory || matchesIngredients;
      });
    }

    // Filter by tags
    if (!selectedTags.includes("All")) {
      const normalizedSelectedTags = selectedTags.map((tag) => tag.toLowerCase());

      result = result.filter((recipe) => recipe.tags?.some((recipeTag) => normalizedSelectedTags.includes(recipeTag.toLowerCase())));
    }

    setFilteredRecipes(result);
  }, [searchText, selectedTags, recipeList]);

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <Feather name="chevron-left" size={60} color="rgba(75, 100, 63, 0.7)" onPress={() => props.navigation.goBack()} />
            <Seeker placeholderText="Search recipe..." value={searchText} onChangeText={setSearchText}></Seeker>
          </View>
          <TagsCarousel tagsList={TAGS} selectedTags={selectedTags} onToggleTag={toggleTag} />
          <FlatList
            data={filteredRecipes}
            keyExtractor={(item) => item.id}
            initialNumToRender={8}
            maxToRenderPerBatch={8}
            windowSize={5}
            style={{ width: "100%", marginBottom: "12%" }}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <RecipeCard recipe={item} isDetailedBox={true} onViewRecipe={() => props.navigation.navigate("ViewRecipe")} onToggleSaved={toggleSaved} />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No recipes found :c</Text>}
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
