import { Text, View, StyleSheet } from "react-native";

export const TitleIconPage = (props) => {
   const Icon = props.icon;

  return (
    <View style={styles.container}>
      <View style={styles.iconStyle}>
      {Icon && <Icon width={60} height={60}/>}
      </View>
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
  },
  iconStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,

    elevation: 5,
  }
});
