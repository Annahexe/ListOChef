import { Text, View, Pressable, StyleSheet } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

export const GroceryListItem = (props) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={props.isSelected ? props.onUnselect : props.onSelect}
        style={styles.leftContainer}
      >
        {props.isSelected ? (
          <MaterialIcons name="check-circle" size={27} color="#4B643F" />
        ) : (
          <Feather name="circle" size={24} color="#4B643F" />
        )}
        <Text style={styles.text}>
          {props.ingredient}
          <Text style={styles.textAmount}> x {props.amount}</Text>
        </Text>
      </Pressable>

      <Pressable onPress={props.onDelete}>
        <MaterialIcons name="delete-outline" size={27} color="red" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginHorizontal: "2%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginVertical: "1%",
    borderWidth: 1,
    borderColor: "rgba(75, 100, 63, 0.6)",
    borderRadius: 15,
    paddingVertical: "2%",
    paddingHorizontal: "2%",
  },
  text: {
    paddingLeft: "2%",
    fontFamily: "InterSemiBold",
    color: "#2C5818",
    fontSize: 20,
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  textAmount: {
    paddingHorizontal: "1.5%",
    fontFamily: "InterSemiBold",
    color: "#414141",
    fontSize: 15,
  },
});
