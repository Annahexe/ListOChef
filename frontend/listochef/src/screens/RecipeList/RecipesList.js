import { StyleSheet, Text, View, ImageBackground, Pressable, ScrollView } from "react-native";
import { useState, useEffect, useContext } from "react";
import RecipeCard from "../../components/RecipeCard";
import AddCircleButton from "../../components/AddCircleButton";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { Seeker } from "../../components/Seeker";
import { TitleIconPage } from "../../components/TitleIconPage";
import RecipeListTitleIcon from "../../../assets/icons/recipeList_titleIcon.svg";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { FilterOrderDropdown  } from "../../components/FilterOrderDropdown";

const RecipesList = (props) => {
  const [recipeList, setRecipeList] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();
  const [filterOrderValue, setFilterOrderValue] = useState("Oldest");

  useEffect(() => {
    setRecipeList([
      {
        id: "1",
        recipeName: "Spaghetti Bolognese",
        type: "pasta",
        time: 20,
        difficulty: "easy",
        photo: "https://supervalu.ie/image/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
        creationDate: "17/02/2026",
        isSaved: true,
      },
      {
        id: "2",
        recipeName: "Paella",
        type: "arroz, conejo",
        time: 60,
        difficulty: "hard",
        photo: "https://e00-xlk-cooking-elmundo.uecdn.es/files/article_main_microformat_4_3/uploads/2023/02/28/63fe82e0ba614.jpeg",
        creationDate: "18/02/2026",
        isSaved: false,
      },
      {
        id: "3",
        recipeName: "Bolognese Sauce",
        type: "sauce, meat, vegetable",
        time: 30,
        difficulty: "medium",
        photo: "https://www.healthyfood.com/wp-content/uploads/2016/11/Bolognese-sauce-iStock-485714898.jpg",
        creationDate: "15/02/2026",
        isSaved: true,
      },
    ]);
  }, []);

  const onAddRecipe = () => {
    return props.navigation.navigate("AddRecipe");
  };

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TitleIconPage titleText="Recipes List" icon={RecipeListTitleIcon} />

          <Seeker placeholderText="Search recipe..."></Seeker>

          <View style={styles.featuredRecipe}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="history" size={26} color="white" />
              <Text style={{ color: "white", fontSize: 20, fontWeight: "600", marginLeft: 10 }}>Last recipe seen</Text>
            </View>
            <Text style={styles.label}>Potato Omelet</Text>
          </View>

          <View style={styles.filterOrderContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons name="calendar-blank-outline" size={28} color="black" />
              <Text style={{ fontSize: 15, fontWeight: "600", marginLeft: 8, marginRight: 30 }}>Order by...</Text>
              <FilterOrderDropdown filterOrderValue={filterOrderValue} setFilterOrderValue={setFilterOrderValue} />
            </View>
          </View>

          <View style={{ flex: 1, width: "100%" }}>
            <ScrollView style={{ width: "100%", marginBottom: 15 }} contentContainerStyle={{ paddingBottom: 5 }}>
              {recipeList.map((recipe, index) => (
                <RecipeCard key={index} name={recipe.recipeName} isSaved={recipe.isSaved} image={recipe.photo}></RecipeCard>
              ))}
            </ScrollView>
            <View style={[styles.floatingButton, { bottom: tabBarHeight - 150 }]}>
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
    padding: 20,
    margin: 10,
  },
  label: {
    fontSize: 30,
    fontWeight: "600",
    borderRadius: 10,
    backgroundColor: "#77AF5C",
    padding: 10,
    marginVertical: 12,
    color: "white",
  },
  filterOrderContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
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
