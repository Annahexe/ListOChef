import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const Start = (props) => {
  return (
    <ImageBackground
      source={require("../../../assets/fondoApp.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(241, 255, 235, 0.39)", "rgba(49, 96, 29, 0.71)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.overlay}
      >
        <View style={styles.layout}>
          <Image
            source={require("../../../assets/icons/ListoChefLogo.png")}
            style={styles.image}
          />
          <Text style={styles.title}>ListOChef</Text>
          <View style={styles.slogan}>
            <Text style={styles.textSlogan}>Plan your shopping.</Text>
            <Text style={styles.textSlogan}>Track your spending.</Text>
            <Text style={styles.textSlogan}>Cook like a chef.</Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={styles.textButton}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => props.navigation.navigate("Register")}
          >
            <Text style={styles.textButton}>Register</Text>
          </Pressable>
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
  title: {
    margin: 10,
    fontSize: 60,
    fontFamily: "MontserratBold",
    textAlign: "center",
    color: "#173509",
    shadowColor: "#085e26",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
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
  button: {
    width: "48%",
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#4B643F",
    alignSelf: "center",
  },
  textButton: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: "white",
    textAlign: "center",
  },
});
export default Start;
