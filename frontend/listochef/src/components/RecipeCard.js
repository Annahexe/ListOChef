import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import Context from "../context/Context";
import Heart from "./Heart";

/**
 * Displays a recipe card with image, title, and optional details.
 * Supports saving/un-saving recipes and navigating to a detailed view.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.recipe - Recipe data object.
 * @param {string} props.recipe.photo - Recipe image URL.
 * @param {string} props.recipe.recipeName - Recipe name.
 * @param {string} props.recipe.category - Recipe category.
 * @param {number} props.recipe.time - Cooking time in minutes.
 * @param {string} props.recipe.difficulty - Recipe difficulty level.
 * @param {boolean} props.recipe.saved - Whether the recipe is saved.
 * @param {string|number} props.recipe.id - Recipe ID.
 * @param {boolean} props.isDetailedBox - If true, shows extended recipe info.
 * @param {function} props.onViewRecipe - Callback when opening recipe details.
 * @param {function} props.onToggleSaved - Callback to toggle saved state.
 * @returns {JSX.Element} Recipe card component.
 */
const RecipeCard = ({ recipe, isDetailedBox, onViewRecipe, onToggleSaved }) => {
  const { setLastRecipeSeen } = useContext(Context);

  /**
   * Handles card press.
   * Stores last viewed recipe, triggers navigation, and logs image URL.
   */
  const handlePress = () => {
    setLastRecipeSeen(recipe);
    onViewRecipe();
    console.log(recipe.photo);
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={handlePress}>
        <View style={styles.imageWrapper}>
          <Image
            style={styles.mainImage}
            source={{
              uri: recipe.photo,
            }}
          />

          {isDetailedBox && (
            <Heart
              colorHeart={recipe.saved ? "red" : "#e8dfdf"}
              stiles={"onImage"}
              onPress={() => onToggleSaved?.(recipe.id)}
            />
          )}
        </View>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={[styles.title, isDetailedBox && styles.titleCentered]}>
              {recipe.recipeName}
            </Text>
            {!isDetailedBox && (
              <Heart
                colorHeart={recipe.saved ? "red" : "#e8dfdf"}
                onPress={() => onToggleSaved?.(recipe.id)}
              />
            )}
          </View>
          {isDetailedBox && (
            <View style={styles.infoContainerLabels}>
              <Text style={styles.infoLabel}>{recipe.category}</Text>
              <Text style={styles.infoLabel}>{recipe.time}min</Text>
              <Text style={styles.infoLabel}>{recipe.difficulty}</Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  mainImage: {
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  container: {
    paddingVertical: "2%",
    paddingHorizontal: 18,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainerLabels: {
    paddingTop: 5,
    justifyContent: "center",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    flexWrap: 10,
    fontSize: 25,
    color: "#2C5818",
    fontWeight: "bold",
  },
  infoLabel: {
    fontFamily: "MontserratSemiBold",
    color: "white",
    fontSize: 16,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(75, 100, 63, 0.5)",
    marginHorizontal: "2%",
  },
  imageWrapper: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  titleCentered: {
    textAlign: "center",
  },
});
export default RecipeCard;
