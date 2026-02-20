import { View, Text, TextInput, StyleSheet } from "react-native";

const ItemInput = (props) => (
  <View>
    <Text style={styles.title}>{props.label}</Text>
    <TextInput
      style={styles.textInput}
      placeholder={props.placeholder}
      placeholderTextColor="white"
      value={props.value}
      onChangeText={props.onChangeText}
      keyboardType={props.keyboardType}
    />
  </View>
);
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    fontSize: 20,
    fontFamily: "InterMedium",
    backgroundColor: "#A5B19F",
    textAlign: "Left",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10,
    elevation: 5,
  },
  title: {
    fontSize: 23,
    fontFamily: "InterBold",
    marginVertical: 5,
    color: "#2C5818",
    marginTop: 10,
  },
});
export default ItemInput;
