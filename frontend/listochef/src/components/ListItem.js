import { Text, Image, View, Pressable, StyleSheet } from "react-native";

import { useState } from "react";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const ListItem = (props) => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="add-circle-outline" size={28} color="#4B643F" />
      <Text style={styles.text}>{props.ingredient}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "2%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginVertical: "1%",
    borderWidth: 1,
    borderColor: "rgba(75, 100, 63, 0.6)",
    borderRadius: 15,
    paddingVertical: "1%",
    paddingHorizontal: "2%"
  },
  text: {
    paddingLeft: "1%",
    fontFamily: "InterSemiBold",
    color: "#2C5818",
    fontSize: 20,
  },
});
