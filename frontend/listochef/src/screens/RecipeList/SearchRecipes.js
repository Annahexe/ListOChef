import { StyleSheet, Text, View, ImageBackground, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Seeker } from "../../components/Seeker";
import { TagsCarousel } from "../../components/TagsCarousel";
import RecipeCard from "../../components/RecipeCard";
import Feather from "@expo/vector-icons/Feather";

const SearchRecipes = (props) => {
  const [recipeList, setRecipeList] = useState([]);

  const TAGS = ["All", "Pasta", "Fish", "Pork", "Beef", "Chicken", "Meat"];

  const [selectedTags, setSelectedTags] = useState(["All"]);

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

  //demo data
  useEffect(() => {
    setRecipeList([
      {
        id: "1",
        recipeName: "Spaghetti Bolognese",
        type: "Lunch",
        tags: ["Pasta", "Meat", "Tomato"],
        time: 20,
        difficulty: "Easy",
        photo: "https://supervalu.ie/image/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
        creationDate: "17/02/2026",
        isSaved: true,
      },
      {
        id: "2",
        recipeName: "Paella",
        type: "Rice",
        tags: ["Rice", "Chicken"],
        time: 60,
        difficulty: "Hard",
        photo: "https://e00-xlk-cooking-elmundo.uecdn.es/files/article_main_microformat_4_3/uploads/2023/02/28/63fe82e0ba614.jpeg",
        creationDate: "18/02/2026",
        isSaved: false,
      },
      {
        id: "3",
        recipeName: "Bolognese Sauce",
        type: "Sauce",
        tags: ["Tomato", "Meat", "Beef"],
        time: 30,
        difficulty: "Medium",
        photo: "https://www.healthyfood.com/wp-content/uploads/2016/11/Bolognese-sauce-iStock-485714898.jpg",
        creationDate: "15/02/2026",
        isSaved: true,
      },
      {
        id: "4",
        recipeName: "Gnocchi Bolognese",
        type: "Lunch",
        tags: ["Tomato", "Pasta", "Beef", "Pasta"],
        time: 30,
        difficulty: "Medium",
        photo: "https://www.eatclub.de/wp-content/uploads/2024/01/gnocchi-bolognese.jpg",
        creationDate: "15/02/2026",
        isSaved: false,
      },
    ]);
  }, []);

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <Feather name="chevron-left" size={60} color="rgba(75, 100, 63, 0.7)" onPress={() => props.navigation.goBack()} />
            <Seeker placeholderText="Search recipe..." onPress={() => console.log("searching")}></Seeker>
          </View>
          <TagsCarousel tagsList={TAGS} selectedTags={selectedTags} onToggleTag={toggleTag} />
          <ScrollView style={{ width: "100%", marginBottom: "12%" }} contentContainerStyle={{ paddingBottom: 20 }}>
            {recipeList.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} isDetailedBox={true} onViewRecipe={() => props.navigation.navigate("ViewRecipe")}></RecipeCard>
            ))}
          </ScrollView>
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
});
export default SearchRecipes;
