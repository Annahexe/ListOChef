import { Text, View, StyleSheet } from "react-native";

export const TitleIconPage = (props) => {
   const Icon = props.icon;

  return (
    <View style={styles.container}>
      {Icon && <Icon width={60} height={60} />}
      <Text style={styles.title}>{props.titleText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "85%",
    alignItems: "center"
  },
  title: {
    fontFamily:"MontserratBold",
    marginLeft: 10,
    marginBottom: 4,
    fontSize: 36,
    color: "#414141",
  }
});
