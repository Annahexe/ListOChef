import { StyleSheet, Text, View, ImageBackground, Pressable, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Seeker } from "../../components/Seeker";
import RecipeCard from "../../components/RecipeCard";
import Feather from "@expo/vector-icons/Feather";

const SearchRecipes = (props) => {
  const [search, setSearch] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [results, setResults] = useState([]);

  //demo data
  useEffect(() => {
    setRecipeList([
      {
        id: "1",
        recipeName: "Spaghetti Bolognese",
        type: "pasta",
        time: 20,
        difficulty: "easy",
        photo:
          "https://supervalu.ie/image/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
        creationDate: "17/02/2026",
        isSaved: true,
      },
      {
        id: "2",
        recipeName: "Paella",
        type: "arroz, conejo",
        time: 60,
        difficulty: "hard",
        photo:
          "https://e00-xlk-cooking-elmundo.uecdn.es/files/article_main_microformat_4_3/uploads/2023/02/28/63fe82e0ba614.jpeg",
        creationDate: "18/02/2026",
        isSaved: false,
      },
      {
        id: "3",
        recipeName: "Bolognese Sauce",
        type: "sauce, meat, vegetable",
        time: 30,
        difficulty: "medium",
        photo:
          "https://www.healthyfood.com/wp-content/uploads/2016/11/Bolognese-sauce-iStock-485714898.jpg",
        creationDate: "15/02/2026",
        isSaved: true,
      },
    ]);
  }, []);

  const onViewRecipe = () => {
    return props.navigation.navigate("ViewRecipe");
  };

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <Feather name="chevron-left" size={60} color="rgba(75, 100, 63, 0.7)" onPress={() => props.navigation.goBack()} />
            <Seeker placeholderText="Search recipe..." onPress={() => console.log("searching")}></Seeker>
          </View>
            <ScrollView style={{ width: "100%", marginBottom: 15 }} contentContainerStyle={{ paddingBottom: 20 }}>
              {recipeList.map((recipe, index) => (
                <Pressable key={index} onPress={onViewRecipe}>
                  <RecipeCard name={recipe.recipeName} isSaved={recipe.isSaved} image={recipe.photo}></RecipeCard>
                </Pressable>
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
