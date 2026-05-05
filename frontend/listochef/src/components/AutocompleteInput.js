import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Keyboard,
} from "react-native";
import { useState } from "react";

/**
 * Input component with autocomplete dropdown functionality.
 *
 * @param {Object} props - Component props.
 * @param {string} props.value - Current input value.
 * @param {string[]} props.options - List of available options.
 * @param {function} props.onSelect - Callback when a value is selected or changed.
 * @returns {JSX.Element} Autocomplete input with dropdown list.
 */
const AutocompleteInput = (props) => {
  const [showList, setShowList] = useState(false);

  const inputValue = props.value || "";
  /**
   * Filter the options based on the current text.
   */
  const filteredOptions = inputValue
    ? props.options.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : props.options;

  /**
   * Handles selection of an option from the dropdown.
   * Updates the value, hides the list, and dismisses the keyboard.
   *
   * @param {string} item - Selected option.
   */
  const handleSelect = (item) => {
    props.onSelect(item);
    setShowList(false);
    Keyboard.dismiss();
  };

  /**
   * Clears the current input value and shows the full options list.
   */
  const handleClear = () => {
    props.onSelect("");
    setShowList(true);
  };
  /**
   * Handles input blur event.
   * If the current value does not match any option, it resets the input.
   */
  const handleBlur = () => {
    const exists = props.options.some(
      (item) => item.toLowerCase() === inputValue.toLowerCase(),
    );

    if (!exists) {
      props.onSelect("");
    }

    setShowList(false);
  };

  const isDifficulty = props.label === "Difficulty";

  return (
    <View style={styles.container}>
      {props.label ? (
        <Text style={styles.labelStyle}>{props.label?.toUpperCase()}</Text>
      ) : null}

      <View style={[styles.inputContainer, props.error && styles.inputError]}>
        <TextInput
          style={styles.textInput}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="#ffffff83"
          editable={true}
          showSoftInputOnFocus={!isDifficulty}
          onFocus={() => setShowList(true)}
          onBlur={handleBlur}
          onChangeText={(text) => {
            props.onSelect(text);
            setShowList(true);
          }}
        />

        {props.value !== "" && (
          <Pressable style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>×</Text>
          </Pressable>
        )}
      </View>

      {props.error ? <Text style={styles.errorText}>{props.error}</Text> : null}

      {showList && filteredOptions.length > 0 && (
        <View style={styles.dropdown}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled={true}
          >
            {filteredOptions.map((item, index) => (
              <Pressable
                key={index}
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    position: "relative",
    zIndex: 1000,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: "InterBold",
    marginVertical: 5,
    color: "#2C5818",
    marginTop: 10,
  },
  inputContainer: {
    position: "relative",
    justifyContent: "center",
    backgroundColor: "#A5B19F",
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    color: "#173509",
    width: "100%",
    fontSize: 20,
    fontFamily: "InterMedium",
    textAlign: "left",
    paddingRight: 35,
  },
  clearButton: {
    position: "absolute",
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: {
    fontSize: 22,
    color: "#173509",
    fontFamily: "InterBold",
  },
  dropdown: {
    backgroundColor: "#a5b19fa1",
    borderRadius: 10,
    maxHeight: 180,
    marginTop: 5,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  itemText: {
    fontSize: 18,
    color: "#485641",
    fontFamily: "InterMedium",
  },
  inputError: {
    borderWidth: 1,
    borderColor: "#D9534F",
  },
  errorText: {
    color: "#D9534F",
    fontSize: 14,
    marginTop: -5,
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: "InterMedium",
  },
});

export default AutocompleteInput;
