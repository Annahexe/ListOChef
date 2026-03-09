import { Text, Image, View, Pressable, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useState, useEffect } from "react";

export const Seeker = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={props.onPress}
        onSubmitEditing={props.onSubmit}
        returnKeyType="search"
        autoFocus={false}
        placeholder={props.placeholderText}
        contentStyle={{
          fontSize: 16,
          fontFamily: "MontserratSemiBold",
          transform:[{ translateY: 1 }]
        }}
        mode="outlined"
        left={<TextInput.Icon icon="magnify" color="#4B643F" size={30} />}
        placeholderTextColor="#2C5818"
        style={styles.input}
        outlineStyle={styles.outline}
        activeOutlineColor="#2C5818"
        outlineColor="#2C5818"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
  },
  input: {
    width: "100%",
    margin: 10,
    backgroundColor: "transparent",
  },
  outline: {
    borderRadius: 10,
    borderWidth: 1.7,
    borderColor: "#2C5818",
  },
});
