import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const TitleModalScreen = (props) => (
  <View style={styles.titlecontainer}>
    <Text style={[styles.title, { fontSize: props.size ? props.size : 40 }]}>
      {props.title}
    </Text>
    <Pressable onPress={props.onPress} style={styles.closeButton}>
      <AntDesign name="close" size={35} color="black" />
    </Pressable>
  </View>
);
const styles = StyleSheet.create({
  titlecontainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    position: "relative",
  },
  title: {
    fontSize: 40,
    fontFamily: "MontserratBold",
    lineHeight: 45,
    paddingRight: 45,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 0,
    padding: 5,
  },
});
export default TitleModalScreen;
