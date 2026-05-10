import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  Keyboard,
  Alert,
  Platform,
} from "react-native";
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

/**
 * Pantry screen that displays the user's pantry items with tag filtering.
 * Allows adding new products, adjusting ingredient amounts, and deleting items.
 *
 * @param {Object} props - Navigation props.
 * @returns {JSX.Element} Pantry screen.
 */
const Pantry = (props) => {
  const { route, token, ingredientTags, pantryItems, setPantryItems } =
    useContext(Context);

  const [selectedTags, setSelectedTags] = useState(["All"]);

  const tabBarHeight = useBottomTabBarHeight();

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

  /** Navigates to AddPantry screen. */
  const goAddProduct = () => {
    Keyboard.dismiss();
    return props.navigation.navigate("AddPantry");
  };

  /**
   * Shows a confirmation alert before deleting a pantry ingredient.
   * @param {Object} item - Ingredient to delete.
   */
  const onDelete = (item) => {
    Alert.alert("Delete ingredient", `Remove ${item.ingredientName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setPantryItems((prev) =>
            prev.filter((i) => i.ingredientName !== item.ingredientName),
          );
          const respone = await removeFromPantryList(item.ingredientName);
        },
      },
    ]);
  };

  /**
   * Sends a request to remove an ingredient from the pantry in the backend.
   * @param {string} ingredientName
   * @returns {Promise<boolean>} True if successful, false otherwise.
   */
  const removeFromPantryList = async (ingredientName) => {
    const data = { ingredientName: ingredientName };

    const response = await postDataToken(
      route + "/removeFromPantryList",
      data,
      token,
    );

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

  /**
   * Increments the amount of an ingredient by 1 and syncs with backend.
   * @param {string} ingredientName
   */
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

  /**
   * Decrements the amount of an ingredient by 1. Removes it if amount reaches 0.
   * @param {string} ingredientName
   */
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

  /**
   * Updates the pantry list in the backend and syncs with context if successful.
   * @param {Object[]} updatedPantryItems
   */
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
    <ImageBackground
      source={require("../../../assets/fondoApp.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TitleIconPage titleText="My Pantry" icon={PantryTitleIcon} />

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

          <Text style={styles.resumeText}>{pantryItems.length} products</Text>
          <View style={{ flex: 1, width: "100%", maxHeight: "67%" }}>
            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={{ paddingBottom: 80 }}
            >
              {pantryItems.map((ingredient, index) => (
                <PantryCard
                  key={ingredient.ingredientName}
                  ingredient={ingredient.ingredientName}
                  amount={ingredient.ingredientAmount}
                  tag={ingredient.ingredientTag}
                  onDelete={() => onDelete(ingredient)}
                  onAddAmount={() => addAmount(ingredient.ingredientName)}
                  onSubtractAmount={() =>
                    subtractAmount(ingredient.ingredientName)
                  }
                />
              ))}
            </ScrollView>
            <View
              style={[
                styles.floatingButton,
                { bottom: tabBarHeight - (Platform.OS === "ios" ? 142 : 140) },
              ]}
            >
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
