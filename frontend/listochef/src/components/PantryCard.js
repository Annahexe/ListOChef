import { Text, View, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

/**
 * Displays a pantry ingredient card with quantity controls and delete option.
 *
 * @param {Object} props - Component props.
 * @param {string} props.ingredient - Name of the ingredient.
 * @param {string} props.tag - Category or tag of the ingredient.
 * @param {number} props.amount - Current quantity of the ingredient.
 * @param {function} props.onDelete - Callback when delete is pressed.
 * @param {function} props.onAddAmount - Callback to increase quantity.
 * @param {function} props.onSubtractAmount - Callback to decrease quantity.
 * @returns {JSX.Element} Pantry ingredient card component.
 */
const PantryCard = (props) => {
  return (
    <View>
      <View style={styles.card}>
        <View style={styles.tittle}>
          <Text style={styles.itemTittle}>{props.ingredient}</Text>
          <Pressable onPress={props.onDelete}>
            <MaterialIcons name="delete-outline" size={27} color="red" />
          </Pressable>
        </View>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{props.tag}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.textAmount}>Quantity: {props.amount}</Text>

          <View style={styles.rightContainer}>
            <Feather
              name="minus-square"
              size={28}
              color="#4B643F"
              style={{ marginHorizontal: "3%" }}
              onPress={props.onSubtractAmount}
            />
            <Feather
              name="plus-square"
              size={28}
              color="#4B643F"
              style={{ marginHorizontal: "3%" }}
              onPress={props.onAddAmount}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    padding: 5,
  },
  itemTittle: {
    fontFamily: "InterMedium",
    fontSize: 20,
    color: "#4B643F",
  },
  tittle: {
    width: "95%",
    marginHorizontal: "2%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: "1%",
    paddingVertical: "2%",
    paddingHorizontal: "2%",
  },
  tag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    marginLeft: "4%",
    paddingVertical: 3,
    borderRadius: 10,
    marginHorizontal: "2%",
    backgroundColor: "rgba(75, 100, 63, 0.5)",
  },
  tagText: {
    fontFamily: "MontserratSemiBold",
    color: "white",
    fontSize: 16,
  },
  rightContainer: {
    flexDirection: "row",
    marginHorizontal: "3%",
  },
  textAmount: {
    fontFamily: "InterSemiBold",
    color: "#414141",
    fontSize: 19,
  },
  quantityContainer: {
    width: "95%",
    marginHorizontal: "2%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: "1%",
    paddingVertical: "2%",
    paddingHorizontal: "2%",
  },
});
export default PantryCard;
