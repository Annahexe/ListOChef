import { View, Text, Pressable, StyleSheet } from "react-native";

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