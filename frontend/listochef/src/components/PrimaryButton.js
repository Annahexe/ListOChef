import { View, Text, Pressable, StyleSheet } from "react-native";

const PrimaryButton = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.buttonStyle} onPress={props.onPress}>
        <Text style={styles.buttonTextStyle}>{props.buttonText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    margin: "3%",
    minWidth: 220,
    paddingTop: 12,
    padding: 10,
    borderRadius: 20,
    textAlign: "center",
    backgroundColor: "#4B643F",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonTextStyle: {
    fontSize: 20,
    fontFamily: "MontserratSemiBold",
    color: "white",
    textAlign: "center",
  },
});

export default PrimaryButton;
