import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Context from "../context/Context";

const RecipeCard = ({ recipe, isDetailedBox, onViewRecipe }) => {
  const { lastRecipeSeen, setLastRecipeSeen } = useContext(Context);

  const handlePress = () => {
    setLastRecipeSeen(recipe);
    onViewRecipe();
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={handlePress}>
        <View style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: "hidden" }}>
          <Image
            style={styles.mainImage}
            source={{
              uri: recipe.photo,
            }}
          ></Image>

          {isDetailedBox && <FontAwesome style={styles.heartOverlay} name={"heart"} size={30} color={recipe.isSaved ? "red" : "white"} />}
        </View>
        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={[styles.title, isDetailedBox && styles.titleCentered]}>{recipe.recipeName}</Text>
            {!isDetailedBox && <FontAwesome name={recipe.isSaved ? "heart" : "heart-o"} size={30} color={recipe.isSaved ? "red" : "black"} />}
          </View>
          {isDetailedBox && (
            <View style={styles.infoContainerLabels}>
              <Text style={styles.infoLabel}>{recipe.type}</Text>
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
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    resizeMode: "cover",
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
  heartOverlay: {
    position: "absolute",
    top: 10,
    right: 12,
    padding: 6,
    borderRadius: 50,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },

  titleCentered: {
    textAlign: "center",
  },
});
export default RecipeCard;
