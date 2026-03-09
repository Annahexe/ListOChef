import { StyleSheet, Text, View, Pressable, ImageBackground, Image } from "react-native";

import RecipeListIcon from "../../../assets/icons/recipeList_iconActive.svg";
import PantryIcon from "../../../assets/icons/pantry_iconActive.svg";
import GroceryListIcon from "../../../assets/icons/groceryList_iconActive.svg";
import ExpensesIcon from "../../../assets/icons/expenses_iconActive.svg";

import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../../components/PrimaryButton";
import Carousel from "../../components/Carousel";

const Start = (props) => {
  const carouselItems = [
    {
      title: "Recipes",
      description: "Discover new recipes or create your own in seconds",
      icon: RecipeListIcon,
    },
    {
      title: "Pantry Control",
      description: "See all the ingredients you have at home at a glance",
      icon: PantryIcon,
    },
    {
      title: "Shopping List",
      description: "Add the ingredients you need and never forget a thing",
      icon: GroceryListIcon,
    },
    {
      title: "Expenses Tracking",
      description: "Track your spending by snapping a photo of your receipt",
      icon: ExpensesIcon,
    },
  ];

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <LinearGradient colors={["rgba(241, 255, 235, 0.39)", "rgba(49, 96, 29, 0.71)"]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.overlay}>
        <View style={styles.layout}>
          <Image source={require("../../../assets/icons/ListoChefLogo.png")} style={styles.image} />
          <Text style={styles.appTitle}>ListOChef</Text>
          <View style={styles.slogan}>
            <Text style={styles.textSlogan}>Plan your shopping.</Text>
            <Text style={styles.textSlogan}>Track your spending.</Text>
            <Text style={styles.textSlogan}>Cook like a chef.</Text>
          </View>
          <PrimaryButton buttonText={"Login"} onPress={() => props.navigation.navigate("Login")} />
          <PrimaryButton buttonText={"Register"} onPress={() => props.navigation.navigate("Register")} />
          <Carousel
            data={carouselItems}
            autoScroll={true}
            autoScrollInterval={4000}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                {item.icon && <item.icon width={40} height={40} />}
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            )}
          />
        </View>
      </LinearGradient>
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
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 8,
  },
  appTitle: {
    fontFamily: "MontserratBold",
    fontSize: 60,
    lineHeight: 60,
    color: "#173509",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 5 },
    textShadowRadius: 4,
  },
  slogan: {
    alignItems: "center",
    margin: 20,
    color: "#173509",
  },
  textSlogan: {
    color: "#414141",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "MontserratBold",
  },
  image: {
    width: 225,
    height: 180,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: "2%"
  },
  itemCard: {
    marginTop: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#ecfbe5",
    borderRadius: 10,
    padding: 16,
    minHeight: 160,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 4,
  },
  itemTitle: {
    fontSize: 20,
    fontFamily: "InterSemiBold",
    color: "#2C5818",
  },
  itemDescription: {
    fontSize: 15,
    fontFamily: "MontserratSemiBold",
    color: "black",
    textAlign: "center"
  },
});
export default Start;
