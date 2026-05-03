import { StyleSheet, Text, View, ImageBackground, Pressable, ScrollView, Keyboard, Alert } from "react-native";
import { useState, useContext } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import AddCircleButton from "../../components/AddCircleButton";
import { Seeker } from "../../components/Seeker";
import { TagsCarousel } from "../../components/TagsCarousel";
import PantryTitleIcon from "../../../assets/icons/pantry_titleIcon.svg";
import { TitleIconPage } from "../../components/TitleIconPage";
import PantryCard from "../../components/PantryCard";
import { postDataToken } from "../../services/services";
import Toast from "react-native-toast-message";
import { updatePantryListPetition } from "../../utils/pantryListUtils";

import Context from "../../context/Context";

const Pantry = (props) => {
  const { route, token } = useContext(Context);

  //Para tags
  const { ingredientTags, setIngredientTags } = useContext(Context);
  const [selectedTags, setSelectedTags] = useState(["All"]);
  //Ingredientes de pantry mediante context
  const { pantryItems, setPantryItems } = useContext(Context);

  //para la altura de los botones de abajo
  const tabBarHeight = useBottomTabBarHeight();

  //Para la barra de tags
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
  //Va a la pantalla de añadir producto
  const goAddProduct = () => {
    Keyboard.dismiss();
    return props.navigation.navigate("AddPantry");
  };
  //Permite borrar ingredientes. Para ello los borra de la lista de los ingredientes del pantry. Salta alerta por si es un error.
  const onDelete = (item) => {
    Alert.alert("Delete ingredient", `Remove ${item.ingredientName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setPantryItems((prev) => prev.filter((i) => i.ingredientName !== item.ingredientName));
          const respone = await removeFromPantryList(item.ingredientName);
        },
      },
    ]);
  };

    const removeFromPantryList = async (ingredientName) => {
      const data = { ingredientName: ingredientName };
  
      const response = await postDataToken(route + "/removeFromPantryList", data, token);
  
      if (!response) {
        Toast.show({
          type: "error",
          text1: "Error removing ingredient!",
          text2: "Please try again later.",
        });
  
        return false;
      }
  
      console.log("Ingredient removed from pantry list:", response);
      return true;
    };

  //Añade cantidad de ingrediente
  const addAmount = async (ingredientName) => {
    const updatedPantryItems = pantryItems.map((item) =>
      item.ingredientName === ingredientName
        ? {
            ...item,
            ingredientAmount: item.ingredientAmount + 1,
          }
        : item,
    );

    await updatePantryAndSync(updatedPantryItems);
  };

  //Quita cantidad de ingrediente
  const subtractAmount = async (ingredientName) => {
    const updatedPantryItems = pantryItems
      .map((item) =>
        item.ingredientName === ingredientName
          ? {
              ...item,
              ingredientAmount: item.ingredientAmount - 1,
            }
          : item,
      )
      .filter((item) => item.ingredientAmount > 0);

    await updatePantryAndSync(updatedPantryItems);
  };

  const updatePantryAndSync = async (updatedPantryItems) => {
    const wasUpdated = await updatePantryListPetition({
      route,
      token,
      pantryItems: updatedPantryItems,
    });

    if (!wasUpdated) {
      return;
    }

    setPantryItems(updatedPantryItems);
  };

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TitleIconPage titleText="My Pantry" icon={PantryTitleIcon} />

          <Seeker placeholderText="Search new products..." onPress={goAddProduct} editable={false}></Seeker>
          <TagsCarousel tagsList={ingredientTags} selectedTags={selectedTags} onToggleTag={toggleTag} />

          <Text style={styles.resumeText}>{pantryItems.length} products</Text>
          <View style={{ flex: 1, width: "100%", maxHeight: "67%" }}>
            <ScrollView>
              {pantryItems.map((ingredient, index) => (
                <PantryCard
                  key={ingredient.ingredientName}
                  ingredient={ingredient.ingredientName}
                  amount={ingredient.ingredientAmount}
                  tag={ingredient.ingredientTag}
                  onDelete={() => onDelete(ingredient)}
                  onAddAmount={() => addAmount(ingredient.ingredientName)}
                  onSubtractAmount={() => subtractAmount(ingredient.ingredientName)}
                />
              ))}
            </ScrollView>
            <View style={[styles.floatingButton, { bottom: tabBarHeight - 160 }]}>
              <Pressable onPress={goAddProduct}>
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
  },
});
export default Pantry;
