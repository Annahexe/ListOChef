import { Text, View, StyleSheet, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

/**
 * Displays a card with pantry/ticket information.
 * Includes supermarket name, date, number of products, total amount, and delete action.
 *
 * @param {Object} props - Component props.
 * @param {string} props.super - Supermarket name.
 * @param {string} props.date - Purchase date.
 * @param {number} props.amount - Number of products.
 * @param {number} props.money - Total price.
 * @param {function} props.onViewTicket - Callback when the card is pressed.
 * @param {function} props.onDelete - Callback when delete button is pressed.
 * @returns {JSX.Element} Pantry card component.
 */
const PantryCard = (props) => {
  return (
    <View>
      <View style={styles.card}>
        <Pressable onPress={props.onViewTicket}>
          <View style={styles.tittle}>
            <Text style={styles.itemTittle}>{props.super}</Text>
            <Pressable onPress={props.onDelete}>
              <MaterialIcons name="delete-outline" size={27} color="red" />
            </Pressable>
          </View>
          <View style={styles.dateContainer}>
            <MaterialCommunityIcons
              name="calendar-blank-outline"
              size={25}
              color="black"
            />
            <Text style={styles.textAmount}> {props.date}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <Text style={styles.textAmount}>{props.amount} products</Text>
            <Text style={[styles.textAmount, { color: "#a1d77d" }]}>
              {props.money}€
            </Text>
          </View>
        </Pressable>
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
    fontFamily: "InterBold",
    fontSize: 25,
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
  textAmount: {
    fontFamily: "InterSemiBold",
    color: "#414141",
    fontSize: 19,
  },
  quantityContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: "2%",
    paddingHorizontal: "2%",
  },
  dateContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: "2%",
    paddingHorizontal: "2%",
  },
});
export default PantryCard;
