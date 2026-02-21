import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const TitleModalScreen = (props) => (
  <View style={styles.titlecontainer}>
    <Text style={[styles.title, { fontSize: props.size ? props.size : 40 }]}>
      {props.title}
    </Text>
    <Pressable onPress={props.onPress}>
      <AntDesign name="close" size={35} color="black" />
    </Pressable>
  </View>
);
const styles = StyleSheet.create({
  titlecontainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontFamily: "MontserratBold",
  },
});
export default TitleModalScreen;
