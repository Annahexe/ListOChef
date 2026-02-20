import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useState, useEffect } from "react";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import ItemView from "../../components/ItemView";
import TitleModalScreen from "../../components/TitleModalScreen";

const ViewRecipe = ({ navigation }) => {
  const [recipe, setRecipe] = useState();
  const [isSaved, setIsSaved] = useState(recipe?.isSaved ?? false);

  useEffect(() => {
    //llamada a la api con el id que tendremos. Actualmente ponemos nosotros el objeto
    setRecipe({
      id: "1",
      recipeName: "Spaghetti Bolognese",
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
      type: "Lunch",
      time: 20,
      difficulty: "easy",
      steps:
        "1. Heat water in a pot. \n2. Add oil to a frying pan. Medium heat.  \n3. Add salt and the ground meat. Stir with a spatula.  \n4. Add chopped onion to the frying pan. Stir.  \n5. When the water boils, add salt and your choice of pasta. Don't forget to stir the pasta with a spoon.  \n6. When the meat is cooked and the onion is golden brown, add tomato sauce. Add salt to balance the acidity and spices to taste.  \n7. When the pasta is al dente, drain it in a colander and add it to the frying pan. Stir.",
      photo:
        "https://supervalu.ie/image/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
      creationDate: "17/02/2026",
      isSaved: true,
    });
  }, []);

  const onAddGroceryList = () => {
    return navigation.goBack();
  };

  if (!recipe) return null;
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
            <Pressable
              style={styles.saveButton}
              onPress={() => setIsSaved(!isSaved)}
            >
              <FontAwesome
                name={isSaved ? "heart" : "heart-o"}
                size={40}
                color={isSaved ? "red" : "white"}
              />
            </Pressable>
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
              label={"Type"}
              info={recipe.type}
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

        <View style={styles.buttonContainer}>
          <Pressable onPress={() => navigation.goBack()} style={styles.button}>
            <Text style={styles.textButton}>Cancel</Text>
          </Pressable>
        </View>
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
  buttonContainer: {
    width: "60%",
    alignSelf: "center",
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
  saveButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10, // asegurar que esté encima
    padding: 5,
  },
  multipleLines: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ViewRecipe;
