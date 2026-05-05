import { View, Text, StyleSheet } from "react-native";

/**
 * Displays read-only information such as labels, ingredients,
 * additional info, or time in a styled container.
 *
 * @param {Object} props - Component props.
 * @param {string} props.label - Section label.
 * @param {string[]} [props.ingredients] - List of ingredients to display.
 * @param {string} [props.info] - Additional information text.
 * @param {number|string} [props.time] - Time value in minutes.
 * @returns {JSX.Element} Styled information view component.
 */
const ItemView = (props) => (
  <View style={{ flex: 1, marginHorizontal: 5 }}>
    <Text style={styles.labelStyle} numberOfLines={1}>
      {props.label?.toUpperCase()}
    </Text>
    <View style={styles.textInfo}>
      {props.ingredients?.map((ingredient, index) => (
        <Text key={index} style={styles.text}>
          · {ingredient}
        </Text>
      ))}
      {props.info ? <Text style={styles.text}>{props.info}</Text> : null}
      {props.time ? <Text style={styles.text}>{props.time}min</Text> : null}
    </View>
  </View>
);
const styles = StyleSheet.create({
  textInfo: {
    width: "100%",
    fontSize: 20,
    fontFamily: "InterMedium",
    backgroundColor: "#A5B19F",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10,
    elevation: 5,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: "InterBold",
    marginVertical: 5,
    color: "#2C5818",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    fontFamily: "InterMedium",
    color: "white",
  },
});
export default ItemView;
