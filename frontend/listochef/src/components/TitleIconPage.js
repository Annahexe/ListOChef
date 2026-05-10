import { Text, View, StyleSheet } from "react-native";

/**
 * TitleIconPage component that displays a page title with an optional icon.
 * Used as a reusable header for main app screens.
 *
 * @param {Object} props - Component props.
 * @param {React.ComponentType} props.icon - SVG icon component displayed next to the title.
 * @param {string} props.titleText - Text displayed as the page title.
 * @returns {JSX.Element} Page title with icon.
 */
export const TitleIconPage = (props) => {
  const Icon = props.icon;

  return (
    <View style={styles.container}>
      <View style={styles.iconStyle}>{Icon && <Icon width={60} height={60} />}</View>
      <Text style={styles.title}>{props.titleText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "85%",
    alignItems: "center",
  },
  title: {
    fontFamily: "MontserratBold",
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
