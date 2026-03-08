import { StyleSheet, Text, View, Pressable, ImageBackground, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../../components/PrimaryButton";

const Start = (props) => {
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
    fontSize: 20,
    fontFamily: "InterBold",
  },
  image: {
    width: 225,
    height: 200,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
export default Start;
