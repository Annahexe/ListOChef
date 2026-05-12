import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

/**
 * PrimaryButton component used as the main action button across the app.
 * Supports loading state, disabled state, and custom button/container styles.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onPress - Function executed when the button is pressed.
 * @param {string} props.buttonText - Text displayed inside the button.
 * @param {boolean} props.isLoading - Shows a loading indicator and disables the button.
 * @param {boolean} props.isDisabled - Disables the button when true.
 * @param {Object|Array} props.buttonStyle - Custom styles applied to the button.
 * @param {Object|Array} props.containerStyle - Custom styles applied to the button container.
 * @returns {JSX.Element} Main reusable button component.
 */
const PrimaryButton = ({
  onPress,
  buttonText,
  isLoading,
  isDisabled = false,
  buttonStyle,
  containerStyle,
}) => {
  const disabled = isLoading || isDisabled;

  return (
    <View style={[styles.buttonContainer, containerStyle]}>
      <Pressable
        style={[
          styles.buttonStyle,
          isDisabled && styles.buttonDisabled,
          buttonStyle,
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <View style={styles.content}>
          {isLoading && (
            <ActivityIndicator
              size="small"
              color="white"
              style={styles.loader}
            />
          )}

          <Text style={styles.buttonTextStyle}>
            {isLoading ? "Loading..." : buttonText}
          </Text>
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
  buttonDisabled: {
    backgroundColor: "#8b9d89",
    opacity: 0.6,
    shadowOpacity: 0,
    elevation: 0,
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
