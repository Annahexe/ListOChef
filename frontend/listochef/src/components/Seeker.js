import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

/**
 * Seeker component used as a search input.
 * It can work as an editable search field or as a pressable input
 * that redirects the user to another screen.
 *
 * @param {Object} props - Component props.
 * @param {string} props.value - Current input value.
 * @param {Function} props.onChangeText - Function executed when the text changes.
 * @param {Function} props.onPress - Function executed when the input receives focus.
 * @param {Function} props.onSubmit - Function executed when the search is submitted.
 * @param {boolean} props.editable - Controls if the keyboard should open on focus.
 * @param {string} props.placeholderText - Placeholder text displayed in the input.
 * @returns {JSX.Element} Search input component.
 */
export const Seeker = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        onFocus={props.onPress}
        onSubmitEditing={props.onSubmit}
        showSoftInputOnFocus={props.editable ?? true}
        returnKeyType="search"
        autoFocus={false}
        placeholder={props.placeholderText}
        contentStyle={{
          fontSize: 16,
          fontFamily: "MontserratSemiBold",
          transform: [{ translateY: 1 }],
        }}
        mode="outlined"
        left={<TextInput.Icon icon="magnify" color="#4B643F" size={30} />}
        placeholderTextColor="#2C5818"
        style={styles.input}
        outlineStyle={styles.outline}
        activeOutlineColor="#2C5818"
        outlineColor="#2C5818"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
  },
  input: {
    width: "100%",
    margin: 10,
    backgroundColor: "transparent",
  },
  outline: {
    borderRadius: 10,
    borderWidth: 1.7,
    borderColor: "#2C5818",
  },
});