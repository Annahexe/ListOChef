import { Text, View, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

/**
 * Displays a selectable list item with optional quantity controls.
 *
 * When selected, allows increasing or decreasing the item amount.
 *
 * @param {Object} props - Component props.
 * @param {string} props.ingredient - Name of the ingredient.
 * @param {number} props.amount - Current quantity of the item.
 * @param {boolean} props.isSelected - Indicates if the item is selected.
 * @param {function} props.onSelect - Callback when selecting the item.
 * @param {function} props.onUnselect - Callback when unselecting the item.
 * @param {function} props.onAddAmount - Callback to increase amount.
 * @param {function} props.onSubtractAmount - Callback to decrease amount.
 * @returns {JSX.Element} Selectable list item component.
 */
export const ListItem = (props) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={props.isSelected ? props.onUnselect : props.onSelect}
        style={styles.leftContainer}
      >
        {props.isSelected ? (
          <MaterialIcons name="check-circle" size={28} color="#4B643F" />
        ) : (
          <MaterialIcons name="add-circle-outline" size={28} color="#4B643F" />
        )}
        <Text style={styles.text}>{props.ingredient}</Text>
      </Pressable>

      {props.isSelected && (
        <View style={styles.rightContainer}>
          <Feather
            name="minus-square"
            size={28}
            color="#4B643F"
            onPress={props.onSubtractAmount}
          />
          <Text style={styles.textAmount}>{props.amount}</Text>
          <Feather
            name="plus-square"
            size={28}
            color="#4B643F"
            onPress={props.onAddAmount}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "2%",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginVertical: "1%",
    borderWidth: 1,
    borderColor: "rgba(75, 100, 63, 0.6)",
    borderRadius: 15,
    paddingVertical: "1%",
    paddingHorizontal: "2%",
  },
  text: {
    paddingLeft: "1%",
    fontFamily: "InterSemiBold",
    color: "#2C5818",
    fontSize: 20,
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
    fontSize: 19,
  },
});
