import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Context from "../../context/Context";
import ItemView from "../../components/ItemView";
import Subscription from "../../components/Subscription";
import TitleProfile from "../../components/TitleProfile";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Profile = (props) => {
  const { user, setUser } = useContext(Context);
  const [subscription, setSubscription] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setSubscription(false);
  }, []);

  const onPressData = () => {
    !subscription ? null : setSubscription(false);
  };
  const onPressSubscription = () => {
    subscription ? null : setSubscription(true);
  };

  const onEditProfile = () => {
    return props.navigation.navigate("EditProfile");
  };
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
            avatar={user.avatar}
            surname={user.surname}
            email={user.email}
            type={subscription ? "subscription" : "data"}
            onPressData={onPressData}
            onPressSubscription={onPressSubscription}
            onPressLogout={() => {
              navigation.getParent("root-stack")?.navigate("Start");
            }}
          />
          {!subscription && (
            <>
              <View style={styles.containerTitle}>
                <FontAwesome5
                  style={{ width: "5%" }}
                  name="user-edit"
                  size={24}
                  color="black"
                />
                <Text style={styles.title}>Personal information</Text>
                <Pressable style={styles.button} onPress={onEditProfile}>
                  <Text style={styles.textButton}>Edit</Text>
                </Pressable>
              </View>
              <ScrollView
                style={styles.containerItems}
                contentContainerStyle={{ paddingBottom: 5 }}
              >
                <ItemView
                  label={"Complete Name:"}
                  info={user.name + " " + user.surname}
                ></ItemView>
                <ItemView label={"E-mail:"} info={user.email}></ItemView>
              </ScrollView>
            </>
          )}
          {subscription && (
            <>
              <View style={styles.containerTitle}>
                <Ionicons name="card-outline" size={30} color="black" />
                <Text style={styles.title}>Subscription</Text>
              </View>
              <ScrollView
                style={styles.containerItems}
                contentContainerStyle={{ paddingBottom: 5 }}
              >
                <Subscription details={"free"} />
                <Subscription details={"premium"} />
              </ScrollView>
            </>
          )}
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
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  title: {
    width: "55%",
    margin: 20,
    fontFamily: "InterBold",
    fontSize: 19,
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
export default Profile;
