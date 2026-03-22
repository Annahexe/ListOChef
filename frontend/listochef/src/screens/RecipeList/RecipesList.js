import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  Keyboard,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import RecipeCard from "../../components/RecipeCard";
import AddCircleButton from "../../components/AddCircleButton";
import { Seeker } from "../../components/Seeker";
import { TitleIconPage } from "../../components/TitleIconPage";
import { FilterOrderDropdown } from "../../components/FilterOrderDropdown";

import RecipeListTitleIcon from "../../../assets/icons/recipeList_titleIcon.svg";

import Context from "../../context/Context";
import { getData } from "../../services/services";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const RecipesList = (props) => {
  const { route } = useContext(Context);
  const { lastRecipeSeen, setLastRecipeSeen } = useContext(Context);
  const { token, setToken } = useContext(Context);

  const [recipeList, setRecipeList] = useState([]);
  const tabBarHeight = useBottomTabBarHeight();
  const [filterOrderValue, setFilterOrderValue] = useState("Oldest");

  const toTime = (ddmmyyyy) => {
    // "17/02/2026" -> [17, 2, 2026]
    const [dd, mm, yyyy] = ddmmyyyy.split("/").map(Number);
    return new Date(yyyy, mm - 1, dd).getTime();
  }; //used to convert String creationDate to real date value

  useEffect(() => {
    setRecipeList([
      {
        id: "1",
        recipeName: "Spaghetti",
        ingredients: [
          "Pasta",
          "Tomato Sauce",
          "Minced meat",
          "Oil",
          "Spices",
          "Onion",
          "Cheese",
        ],
        tag: ["pasta", "meat"],
        category: "Lunch",
        time: 20,
        difficulty: "Low",
        steps:
          "1. Heat water in a pot. \n2. Add oil to a frying pan. Medium heat.  \n3. Add salt and the ground meat. Stir with a spatula.  \n4. Add chopped onion to the frying pan. Stir.  \n5. When the water boils, add salt and your choice of pasta. Don't forget to stir the pasta with a spoon.  \n6. When the meat is cooked and the onion is golden brown, add tomato sauce. Add salt to balance the acidity and spices to taste.  \n7. When the pasta is al dente, drain it in a colander and add it to the frying pan. Stir.",
        photo:
          "https://supervalu.ie/image/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
        creationDate: "01/02/2026",
        isSaved: true,
      },
      {
        id: "2",
        recipeName: "Paella",
        ingredients: [
          "Rice",
          "Chicken",
          "Seafood",
          "Bell pepper",
          "Onion",
          "Garlic",
          "Olive oil",
          "Paprika",
          "Saffron",
          "Salt",
          "Stock",
        ],
        tag: ["rice", "seafood"],
        category: "Lunch",
        time: 45,
        difficulty: "Medium",
        steps:
          "1. Heat olive oil in a wide pan over medium heat. \n2. Add chopped onion, garlic and bell pepper. Stir until soft.  \n3. Add the chicken and cook until lightly browned.  \n4. Add the rice and stir for one minute.  \n5. Add paprika, saffron, salt and hot stock. Stir gently.  \n6. Cook without stirring for about 15 minutes.  \n7. Add the seafood and cook for another 10 minutes until everything is done.",
        photo:
          "https://e00-xlk-cooking-elmundo.uecdn.es/files/article_main_microformat_4_3/uploads/2023/02/28/63fe82e0ba614.jpeg",
        creationDate: "19/02/2026",
        isSaved: false,
      },
      {
        id: "3",
        recipeName: "Bolognese Sauce",
        ingredients: [
          "Minced meat",
          "Tomato sauce",
          "Onion",
          "Garlic",
          "Olive oil",
          "Salt",
          "Pepper",
          "Spices",
        ],
        tag: ["sauce", "meat"],
        category: "Lunch",
        time: 40,
        difficulty: "Low",
        steps:
          "1. Heat olive oil in a frying pan over medium heat. \n2. Add chopped onion and garlic. Stir until soft.  \n3. Add the minced meat and cook until browned.  \n4. Add salt, pepper and spices to taste.  \n5. Pour in the tomato sauce and stir well.  \n6. Reduce heat and let it simmer for about 20 minutes, stirring occasionally.",
        photo:
          "https://www.healthyfood.com/wp-content/uploads/2016/11/Bolognese-sauce-iStock-485714898.jpg",
        creationDate: "18/02/2026",
        isSaved: false,
      },
      {
        id: "4",
        recipeName: "Gnocchi Bolognese",
        ingredients: [
          "Gnocchi",
          "Minced meat",
          "Tomato sauce",
          "Onion",
          "Olive oil",
          "Salt",
          "Spices",
          "Cheese",
        ],
        tag: ["pasta", "meat"],
        category: "Lunch",
        time: 25,
        difficulty: "Low",
        steps:
          "1. Heat olive oil in a frying pan over medium heat. \n2. Add chopped onion and cook until soft.  \n3. Add the minced meat and cook until browned.  \n4. Add tomato sauce, salt and spices. Stir and let it cook for 10 minutes.  \n5. Boil water in a pot and cook the gnocchi according to the package instructions.  \n6. Drain the gnocchi and add them to the frying pan.  \n7. Mix well and serve with cheese on top.",
        photo:
          "https://www.eatclub.de/wp-content/uploads/2024/01/gnocchi-bolognese.jpg",
        creationDate: "20/02/2026",
        isSaved: true,
      },
      {
        id: "5",
        recipeName: "Potato Omelette",
        ingredients: ["Potatoes", "Eggs", "Onion", "Olive oil", "Salt"],
        tag: ["eggs", "potato"],
        category: "Dinner",
        time: 20,
        difficulty: "Low",
        steps:
          "1. Peel and slice the potatoes. \n2. Heat olive oil in a frying pan over medium heat.  \n3. Add the potatoes and onion and cook slowly until soft.  \n4. Beat the eggs in a bowl and add salt.  \n5. Drain the potatoes and mix them with the eggs.  \n6. Pour the mixture into the pan and cook until set on both sides.",
        photo:
          "https://mojo.generalmills.com/api/public/content/9xIHKwJDH0-1wbHPsVCCVQ_gmi_hi_res_jpeg.jpeg?v=2bfc22c6&t=16e3ce250f244648bef28c5949fb99ff",
        creationDate: "19/02/2026",
        isSaved: true,
      },
    ]);
  }, []);

  // useEffect(() => {
  //   const loadRecipes = async () => {
  //     console.log("token before request:", token);

  //     const data = await getRecipesPetition();
  //     console.log("recipes response:", data);

  //     if (data) {
  //       setRecipeList(data);
  //     }
  //   };

  //   loadRecipes();
  // }, []);

  const onAddRecipe = () => {
    return props.navigation.navigate("AddRecipe");
  };

  const onViewRecipe = () => {
    return props.navigation.navigate("ViewRecipe");
  };

  const sortedRecipes = [...recipeList].sort((a, b) => {
    const timeA = toTime(a.creationDate);
    const timeB = toTime(b.creationDate);

    if (filterOrderValue === "Oldest") {
      return timeA - timeB;
    }
    return timeB - timeA;
  });

  const goSearchRecipe = () => {
    Keyboard.dismiss();
    return props.navigation.navigate("SearchRecipes");
  };

  const toggleSaved = (id) => {
    setRecipeList((prev) =>
      prev.map((recipe) =>
        recipe.id === id ? { ...recipe, isSaved: !recipe.isSaved } : recipe,
      ),
    );
  };

  const getRecipesPetition = async () => {
    const response = await getData(
      route + "/recipes/userRecipes",
      token,
    );
    return response;
  };

  return (
    <ImageBackground
      source={require("../../../assets/fondoApp.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TitleIconPage titleText="Recipes List" icon={RecipeListTitleIcon} />

          <Seeker
            placeholderText="Search recipe..."
            onPress={goSearchRecipe}
          ></Seeker>

          <View style={styles.featuredRecipe}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome5 name="history" size={26} color="white" />
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginLeft: 10,
                  fontFamily: "InterSemiBold",
                }}
              >
                Last recipe seen
              </Text>
            </View>
            <Text style={styles.label} onPress={onViewRecipe}>
              {lastRecipeSeen.recipeName}
            </Text>
          </View>

          <View style={styles.filterOrderContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={28}
                color="black"
              />
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: "MontserratSemiBold",
                  marginLeft: 8,
                  marginRight: 20,
                }}
              >
                Order by...
              </Text>
              <FilterOrderDropdown
                filterOrderValue={filterOrderValue}
                setFilterOrderValue={setFilterOrderValue}
              />
            </View>
          </View>

          <View style={{ flex: 1, width: "100%" }}>
            <ScrollView
              style={{ width: "100%", marginBottom: 15 }}
              contentContainerStyle={{ paddingBottom: 5 }}
            >
              {sortedRecipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  recipe={recipe}
                  isDetailedBox={false}
                  onViewRecipe={onViewRecipe}
                  onToggleSaved={toggleSaved}
                ></RecipeCard>
              ))}
            </ScrollView>
            <View
              style={[styles.floatingButton, { bottom: tabBarHeight - 150 }]}
            >
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
    padding: 15,
    margin: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 28,
    borderRadius: 10,
    backgroundColor: "#77AF5C",
    padding: 10,
    marginVertical: 10,
    color: "white",
    fontFamily: "MontserratSemiBold",
  },
  filterOrderContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
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
