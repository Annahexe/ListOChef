import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";

const ItemInput = (props) => {
  const [showPassword, setShowPassword] = useState(!props.eye);

  return (
    <View>
      <Text style={[styles.labelStyle, props.style]}>{props.label?.toUpperCase()}</Text>

      <View style={[styles.inputContainer, props.multiline && styles.multilineInput, props.error && styles.inputError]}>
        <TextInput
          style={[styles.textInput, props.eye && styles.textInputWithEye]}
          placeholder={props.placeholder}
          placeholderTextColor="#ffffff83"
          value={props.value}
          onChangeText={props.onChangeText}
          keyboardType={props.keyboardType}
          multiline={props.multiline || false}
          numberOfLines={props.multiline ? props.numberOfLines || 4 : 1}
          textAlignVertical={props.multiline ? "top" : "center"}
          secureTextEntry={props.eye && !showPassword}
          editable={props.editable ?? true}
        />

        {props.eye && (
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeContainer}>
            <AntDesign name={showPassword ? "eye-invisible" : "eye"} size={26} color="white" />
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
    flex: 1,
    color: "#173509",
    fontSize: 20,
    fontFamily: "InterMedium",
    textAlign: "left",
  },
  textInputWithEye: {
    paddingRight: 50,
  },
  labelStyle: {
    fontSize: 16,
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
