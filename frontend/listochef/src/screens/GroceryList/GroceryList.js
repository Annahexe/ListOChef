import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import GroceryListTitleIcon from "../../../assets/icons/groceryList_titleIcon.svg";
import { TitleIconPage } from "../../components/TitleIconPage";

const GroceryList = (props) => {
  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
      <TitleIconPage titleText="Grocery List" icon={GroceryListTitleIcon} />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 235, 0.7)",
  },
  container: {
    flex: 1,
    marginTop: 50,
    position: "relative",
    alignItems: "center",
  }
});
export default GroceryList;