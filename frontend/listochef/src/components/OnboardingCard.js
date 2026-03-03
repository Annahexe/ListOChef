import React from "react";
import { StyleSheet, Text, View, Pressable, ImageBackground, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function OnboardingCard({ children }) {
  return (
    <ImageBackground source={require("../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <LinearGradient colors={["rgba(241, 255, 235, 0.39)", "rgba(49, 96, 29, 0.71)"]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.overlay}>
        <View style={styles.card}>{children}</View>
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
    height: "80%",
    backgroundColor: "rgba(254,254,254,0.7)",
    borderRadius: 20,
    padding: 5,
  },
});
