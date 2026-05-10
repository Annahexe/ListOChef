import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

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
      {!props.isLoading && (
      <Pressable onPress={props.onCancel} style={[styles.button, { backgroundColor: "#4B643F" }]}>
        <Text style={styles.textButton}>Cancel</Text>
      </Pressable>
      )}

      <Pressable style={[styles.button, { backgroundColor: props.isFormComplete ? "#4B643F" : "#85917F", width: props.isLoading ? "98%" : "48%" }]} onPress={props.onSave}>
        {props.isLoading && <ActivityIndicator size="small" color="white" style={styles.loader} />}
        <Text style={styles.textButton}>{props.isLoading ? "Loading..." : "Save"}</Text>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: "white",
    textAlign: "center",
    flexShrink: 1,
  },
  loader: {
    marginRight: 5,
  },
});

export default ModalButtons;
