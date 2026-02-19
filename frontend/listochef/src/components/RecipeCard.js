import { Text, View, Image, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RecipeCard = (props) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.mainImage}
        source={{
          uri: props.image,
        }}
      ></Image>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.name}</Text>

        {props.isSaved === true && (
          <FontAwesome name="heart" size={30} color="red" />
        )}

        {props.isSaved === false && (
          <FontAwesome name="heart-o" size={30} color="black" />
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
  },
  mainImage: {
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  infoContainer: {
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});
export default RecipeCard;
