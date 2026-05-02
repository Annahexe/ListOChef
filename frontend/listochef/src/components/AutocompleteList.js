import { View, Text, Pressable, StyleSheet } from "react-native";
import AutocompleteInput from "./AutocompleteInput";

const AutocompleteList = (props) => {
  const addItem = () => {
    if (props.values.length === 0 || props.values[props.values.length - 1] !== "") {
      props.setValues((prev) => [...prev, ""]);
    } else {
      Toast.show({
        type: "error",
        text1: `Please fill in the previous ${props.label.toLowerCase()}`,
        text2: "before adding a new one.",
      });
    }
  };

  return (
    <View>
      {props.values.map((value, index) => (
        <AutocompleteInput
          key={index}
          label={index === 0 ? props.label : ""}
          placeholder={props.placeholder}
          value={value}
          options={props.options}
          onSelect={(text) => {
            props.setValues((prev) => {
              const newArr = [...prev];
              newArr[index] = text;
              return newArr;
            });
          }}
          error={props.error}
        />
      ))}

      <Pressable style={styles.addInput} onPress={addItem}>
        <Text style={styles.textAddInput}>Add {props.label.toLowerCase().slice(0, -1)}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  addInput: {
    width: "100%",
    fontSize: 20,
    fontFamily: "InterMedium",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#2C5818",
    alignItems: "center",
  },
  textAddInput: {
    color: "#2C5818",
    fontSize: 18,
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
export default AutocompleteList;
