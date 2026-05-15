import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  FlatList,
  Keyboard,
  ScrollView,
} from "react-native";
import { useState } from "react";

const AutocompleteInput = (props) => {
  const [showList, setShowList] = useState(false);

  const inputValue = props.value || "";

  const filteredOptions = inputValue
    ? props.options.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : props.options;

  const handleSelect = (item) => {
    props.onSelect(item);
    setShowList(false);
    Keyboard.dismiss();
  };

  const handleClear = () => {
    props.onSelect("");
    setShowList(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      const exists = props.options.some(
        (item) => item.toLowerCase() === inputValue.toLowerCase(),
      );
      if (!exists) props.onSelect("");
      setShowList(false);
    }, 200);
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
          scrollEnabled={false}
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
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always"
            style={{ maxHeight: 180 }}
          >
            {filteredOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                activeOpacity={0.7}
                delayPressIn={0}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
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
