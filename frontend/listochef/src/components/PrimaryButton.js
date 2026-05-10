import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

const PrimaryButton = ({ onPress, buttonText, isLoading, buttonStyle, containerStyle}) => {
  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <Pressable style={[styles.buttonStyle, buttonStyle]} onPress={onPress} disabled={isLoading}>
        <View style={styles.content}>
          {isLoading && <ActivityIndicator size="small" color="white" style={styles.loader} />}
          <Text style={styles.buttonTextStyle}>{isLoading ? "Loading..." : buttonText}</Text>
        </View>
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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    marginRight: 10,
  },
});

export default PrimaryButton;
