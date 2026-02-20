import { View, Text, TextInput, StyleSheet } from "react-native";

const ItemView = (props) => (
  <View style={{ flex: 1, marginHorizontal: 5 }}>
    <Text style={styles.title}>{props.label}</Text>
    <View style={styles.textInfo}>
      {props.ingredients?.map((ingredient, index) => (
        <Text key={index} style={styles.text}>
          · {ingredient}
        </Text>
      ))}
      {props.info ? <Text style={styles.text}>{props.info}</Text> : null}
      {props.time ? <Text style={styles.text}>{props.time} min</Text> : null}
    </View>
  </View>
);
const styles = StyleSheet.create({
  textInfo: {
    width: "100%",
    fontSize: 20,
    fontFamily: "InterMedium",
    backgroundColor: "#A5B19F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 10,
    elevation: 5,
  },
  title: {
    fontSize: 23,
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
