import { View, Text, Pressable, StyleSheet } from "react-native";

/**
 * Renders action buttons for a modal (Cancel and Save).
 * Save button is disabled visually when the form is not complete.
 *
 * @param {Object} props - Component props.
 * @param {function} props.onCancel - Callback when cancel button is pressed.
 * @param {function} props.onSave - Callback when save button is pressed.
 * @param {boolean} props.isFormComplete - Indicates if the form is valid and complete.
 * @returns {JSX.Element} Modal buttons component.
 */
const ModalButtons = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        onPress={props.onCancel}
        style={[styles.button, { backgroundColor: "#4B643F" }]}
      >
        <Text style={styles.textButton}>Cancel</Text>
      </Pressable>

      <Pressable
        style={[
          styles.button,
          { backgroundColor: props.isFormComplete ? "#4B643F" : "#85917F" },
        ]}
        onPress={props.onSave}
      >
        <Text style={styles.textButton}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  button: {
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  textButton: {
    fontSize: 25,
    fontFamily: "InterBold",
    color: "white",
    textAlign: "center",
  },
});

export default ModalButtons;
