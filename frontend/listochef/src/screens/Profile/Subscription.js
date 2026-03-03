import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

import Context from "../../context/Context";
import Plan from "../../components/Plan";
import TitleProfile from "../../components/TitleProfile";

const Subscription = (props) => {
  const { user, setUser } = useContext(Context);
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../../assets/fondoApp.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TitleProfile
            name={user.name}
            surname={user.surname}
            email={user.email}
            type={"subscription"}
            onPressData={() => props.navigation.navigate("Profile")}
            onPressSubscription={() => {}}
            onPressLogout={() => {
              navigation.getParent("root-stack")?.navigate("Start");
            }}
          />
          <View style={styles.containerTitle}>
            <Ionicons
              style={{ width: "10%" }}
              name="card-outline"
              size={30}
              color="black"
            />
            <Text style={styles.title}>Personal information</Text>
          </View>
          <ScrollView
            style={styles.containerItems}
            contentContainerStyle={{ paddingBottom: 5 }}
          >
            <Plan details={"free"} />
            <Plan details={"premium"} />
          </ScrollView>
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
  },

  containerTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    width: "70%",
    margin: 20,
    fontFamily: "InterBold",
    fontSize: 20,
    textAlign: "Left",
  },
  button: {
    width: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B643F",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  textButton: {
    fontSize: 15,
    fontFamily: "InterBold",
    color: "white",
  },
  containerItems: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
});
export default Subscription;
