import React from "react";
import { StyleSheet, Text, View, Pressable, ImageBackground, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";

export default function OnboardingCard(props) {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require("../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <LinearGradient colors={["rgba(241, 255, 235, 0.39)", "rgba(49, 96, 29, 0.71)"]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Feather style={styles.backBtn} name="chevron-left" size={55} color="rgba(75, 100, 63, 0.7)" onPress={() => navigation.goBack()} />
            <Image source={require("../../assets/icons/ListoChefLogo.png")} style={styles.image} />
            <Text style={styles.appTitle}>ListOChef</Text>
            <Text style={[styles.pageTitle, props.titleStyle]}>{props.pageTitle}</Text>
          </View>
          {props.children}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    height: "85%",
    backgroundColor: "rgba(254,254,254,0.7)",
    borderRadius: 20,
    padding: 15,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  image: {
    height: 120,
    resizeMode: "contain",
    alignSelf: "center",
  },
  appTitle: {
    fontFamily: "MontserratBold",
    fontSize: 50,
      lineHeight: 60,
    color: "#173509",
  },
  pageTitle: {
    fontFamily: "MontserratBold",
    fontSize: 40,
    color: "#414141",
    textAlign: "center"
  },
});
