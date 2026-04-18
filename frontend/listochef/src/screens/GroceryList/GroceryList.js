import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  Keyboard,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AddCircleButton from "../../components/AddCircleButton";
import { GroceryListItem } from "../../components/GroceryListItem";
import GroceryListTitleIcon from "../../../assets/icons/groceryList_titleIcon.svg";
import { TitleIconPage } from "../../components/TitleIconPage";
import { Seeker } from "../../components/Seeker";
import { TagsCarousel } from "../../components/TagsCarousel";

import Context from "../../context/Context";
const GroceryList = (props) => {
  //Para tags
  const { ingredientTags, setIngredientTags } = useContext(Context);
  const [selectedTags, setSelectedTags] = useState(["All"]);

  //para la altura de los botones de abajo
  const tabBarHeight = useBottomTabBarHeight();

  //ingredientes seleccionados en mi lista para añadir a pantry
  const [ingredientsToPantry, setIngredientsToPantry] = useState([]);

  //Ingredientes seleccionados y cantidad desde añadir producto
  const { selectedIngredients, setSelectedIngredients } = useContext(Context);

  //Ingredientes de pantry mediante context
  const { pantryItems, setPantryItems } = useContext(Context);
  const isDisabled = ingredientsToPantry.length === 0;

  //Para la barra de tags
  const toggleTag = (selectedTag) => {
    setSelectedTags((previousSelectedTags) => {
      if (selectedTag == "All") {
        return ["All"];
      }
      const tagsWithoutAll = previousSelectedTags.filter(
        (element) => element !== "All",
      );
      if (tagsWithoutAll.includes(selectedTag)) {
        const selectedTagsList = tagsWithoutAll.filter(
          (element) => element !== selectedTag,
        );
        return selectedTagsList.length === 0 ? ["All"] : selectedTagsList;
      }
      return [...tagsWithoutAll, selectedTag];
    });
  };

  //Va a la pantalla de añadir producto
  const goAddProduct = () => {
    Keyboard.dismiss();
    return props.navigation.navigate("AddProduct");
  };

  //añade ingrediente a la lista de seleccionados
  const onSelect = (item) => {
    setIngredientsToPantry((prev) => [...prev, item]);
  };

  //Quita ingrediente de la lista de seleccionados
  const unSelect = (item) => {
    setIngredientsToPantry((prev) => prev.filter((i) => i.name !== item.name));
  };

  //Comprueba si el ingrediente esta seleccionado
  const isItemSelected = (item) => {
    return ingredientsToPantry.some((i) => i.name === item.name);
  };

  //Añade a la lista que tenemos en Context. Elimina el ingrediente de la lista de ingredientes y borra los ingredientes seleccionados.
  const addToPantry = () => {
    //Añade a la lista de Context
    setPantryItems((prev) => {
      const updated = [...prev];

      ingredientsToPantry.forEach((newItem) => {
        const existingIndex = updated.findIndex(
          (item) => item.name === newItem.name,
        );

        if (existingIndex !== -1) {
          // Si existe, sumamos cantidad
          updated[existingIndex] = {
            ...updated[existingIndex],
            amount:
              (updated[existingIndex].amount || 0) + (newItem.amount || 0),
          };
        } else {
          // Si no existe, lo añadimos
          updated.push(newItem);
        }
      });
      return updated;
    });
    //Elimino de la lista el ingrediente
    setSelectedIngredients((prev) =>
      prev.filter(
        (item) => !ingredientsToPantry.some((i) => i.name === item.name),
      ),
    );
    //vacia los seleccionados
    setIngredientsToPantry([]);
  };

  //Permite borrar ingredientes. Para ello los borra de la lista de los ingredientes y tambien de la lista si estuviese seleccionado. Salta alerta por si es un error.
  const onDelete = (item) => {
    Alert.alert("Delete ingredient", `Remove ${item.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setSelectedIngredients((prev) =>
            prev.filter((i) => i.name !== item.name),
          );
          setIngredientsToPantry((prev) =>
            prev.filter((i) => i.name !== item.name),
          );
        },
      },
    ]);
  };

  return (
    <ImageBackground
      source={require("../../../assets/fondoApp.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TitleIconPage titleText="Grocery List" icon={GroceryListTitleIcon} />

          <Seeker
            placeholderText="Search new products..."
            onPress={goAddProduct}
            editable={false}
          ></Seeker>
          <TagsCarousel
            tagsList={ingredientTags}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
          />

          <Text style={styles.resumeText}>
            {selectedIngredients.length} products
          </Text>
          <View style={{ flex: 1, width: "100%", maxHeight: "55%" }}>
            <ScrollView>
              {selectedIngredients.map((item, index) => (
                <GroceryListItem
                  key={index}
                  ingredient={item.name}
                  amount={item.amount}
                  isSelected={isItemSelected(item)}
                  onSelect={() => onSelect(item)}
                  onUnselect={() => unSelect(item)}
                  onDelete={() => onDelete(item)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={[styles.floatingButton, { bottom: tabBarHeight - 150 }]}>
            <Pressable onPress={addToPantry} disabled={isDisabled}>
              <Text
                style={[
                  styles.buttonPantry,
                  isDisabled && styles.buttonDisabled,
                ]}
              >
                Add to Pantry
              </Text>
            </Pressable>
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
    marginHorizontal: 20,
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
    right: 40,
    color: "white",
    fontFamily: "InterMedium",
    fontSize: 20,
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
});
export default GroceryList;
