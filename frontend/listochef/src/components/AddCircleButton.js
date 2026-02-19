import { View, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const AddCircleButton = (props) => {
  return (
    <View style={styles.button}>
      <FontAwesome5 name="plus" size={50} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4B643F",
    borderRadius: 50,
    textAlign: "center",
    marginBottom: 100,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
export default AddCircleButton;
