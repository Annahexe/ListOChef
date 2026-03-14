import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";

const ItemInput = (props) => {
  const [showPassword, setShowPassword] = useState(!props.eye);

  return (
    <View>
      <Text style={[styles.title, props.style]}>{props.label}</Text>

      <View
        style={[
          styles.inputContainer,
          props.multiline && styles.multilineInput,
          props.error && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.textInput}
          placeholder={props.placeholder}
          placeholderTextColor="#ffffff83"
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          multiline={props.multiline}
          numberOfLines={props.numberOfLines}
          textAlignVertical={props.multiline ? "top" : "center"}
          secureTextEntry={props.eye && !showPassword}
        />

        {props.eye && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeContainer}
          >
            <AntDesign
              name={showPassword ? "eye-invisible" : "eye"}
              size={26}
              color="white"
            />
          </Pressable>
        )}
      </View>
      {props.error ? <Text style={styles.errorText}>{props.error}</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    justifyContent: "center",
    backgroundColor: "#A5B19F",
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    color: "#173509",
    width: "100%",
    fontSize: 20,
    fontFamily: "InterMedium",
    textAlign: "left",
  },
  title: {
    fontSize: 23,
    fontFamily: "InterBold",
    marginVertical: 5,
    color: "#2C5818",
    marginTop: 10,
  },
  multilineInput: {
    height: 140,
    paddingTop: 12,
  },
  eyeContainer: {
    position: "absolute",
    right: 15,
    padding: 10,
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#D9534F",
  },
  errorText: {
    color: "#D9534F",
    fontSize: 14,
    marginTop: -5,
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: "InterMedium",
  },
});
export default ItemInput;
