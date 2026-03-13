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

const AutocompleteInput = (props) => {
  const [showList, setShowList] = useState(false);

  const inputValue = props.value || "";
  // Filtra las opciones según el texto actual
  const filteredOptions = inputValue
    ? props.options.filter((item) =>
        item.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : props.options;

  // Cuando se pulsa una opción
  const handleSelect = (item) => {
    props.onSelect(item);
    setShowList(false);
    Keyboard.dismiss();
  };
  const handleClear = () => {
    props.onSelect("");
    setShowList(true);
  };
  // Cuando el input pierde foco
  const handleBlur = () => {
    const exists = props.options.some(
      (item) => item.toLowerCase() === (props.value || "").toLowerCase(),
    );

    if (!exists) {
      props.onSelect("");
    }

    setShowList(false); //
  };
  const isDifficulty = props.label === "Difficulty";

  return (
    <View style={styles.container}>
      {props.label === "" ? (
        <></>
      ) : (
        <Text style={styles.title}>{props.label}</Text>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor="#ffffff83"
          editable={true} // permitimos borrar
          showSoftInputOnFocus={!isDifficulty} // no abre teclado si difficulty
          onFocus={() => setShowList(true)}
          onBlur={handleBlur}
          onChangeText={(text) => {
            props.onSelect(text);
            setShowList(true);
          }}
        />

        {isDifficulty && props.value !== "" && (
          <Pressable style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>×</Text>
          </Pressable>
        )}
      </View>

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
  container: { marginBottom: 10, position: "relative", zIndex: 1000 },
  title: {
    fontSize: 23,
    fontFamily: "InterBold",
    marginVertical: 5,
    color: "#2C5818",
    marginTop: 10,
  },
  input: {
    width: "100%",
    fontSize: 20,
    fontFamily: "InterMedium",
    backgroundColor: "#A5B19F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    paddingRight: 40,
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
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  clearButton: {
    position: "absolute",
    right: 10, // separación del borde derecho
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  clearText: {
    fontSize: 20,
    color: "#000",
  },
});

export default AutocompleteInput;
