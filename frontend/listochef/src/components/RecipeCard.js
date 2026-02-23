import { Text, View, Image, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RecipeCard = ({ recipe, isDetailedBox }) => {
  return (
    <View style={styles.card}>
      <View style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, overflow: "hidden" }}>
        <Image
          style={styles.mainImage}
          source={{
            uri: recipe.photo,
          }}
        ></Image>
      </View>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{recipe.recipeName}</Text>
          <FontAwesome name={recipe.isSaved ? "heart" : "heart-o"} size={30} color={recipe.isSaved ? "red" : "black"} />
        </View>
        {isDetailedBox && (
          <View style={styles.infoContainerLabels}>
            <Text style={styles.infoLabel}>{recipe.type}</Text>
            <Text style={styles.infoLabel}>{recipe.time}min</Text>
            <Text style={styles.infoLabel}>{recipe.difficulty}</Text>
          </View>
        )}
      </View>
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
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  infoContainer: {
    justifyContent: "center",
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
});
export default RecipeCard;
