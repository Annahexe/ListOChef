import { View, StyleSheet } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

/**
 * Renders a circular button with a plus icon.
 *
 * @param {Object} props - Component props.
 * @returns {JSX.Element} Circular add button.
 */
const AddCircleButton = (props) => {
  return (
    <View style={[styles.button, props.style]}>
      <FontAwesome5 name="plus" size={50} color="white" />
    </View>
  );
};

/**
 * Stylesheet for the AddCircleButton component.
 */
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4B643F",
    borderRadius: 50,
    textAlign: "center",
    marginBottom: 80,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});

export default AddCircleButton;
