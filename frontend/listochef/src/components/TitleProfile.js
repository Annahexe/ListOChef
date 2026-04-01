import { Text, View, StyleSheet, Pressable, Image } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const TitleProfile = (props) => {
  const type = props.type;

  return (
    <View style={styles.container}>
      <View style={styles.photoContainer}>
        <View style={styles.logoutContainer}>
          <Pressable style={styles.button} onPress={props.onPressLogout}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.textButton}>Log out</Text>
          </Pressable>
        </View>

        <View style={styles.photo}>
          <Image
            source={{uri: props.avatar}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.data}>
          <Text style={styles.name}>{props.name + " " + props.surname}</Text>
          <Text style={styles.email}>{props.email}</Text>
        </View>
        <View style={styles.bar}>
          <Pressable style={{ flex: 1 }} onPress={props.onPressData}>
            <View
              style={[
                styles.textStack,
                type === "data" && {
                  backgroundColor: "#D0DDC8",
                },
              ]}
            >
              <FontAwesome
                name="user-o"
                size={30}
                color={type === "data" ? "#2C5818" : "#EEF8E9"}
              />
              <Text
                style={[
                  styles.textStackBar,
                  type === "data" && {
                    color: "#2C5818",
                  },
                ]}
              >
                Personal Data
              </Text>
            </View>
          </Pressable>
          <Pressable style={{ flex: 1 }} onPress={props.onPressSubscription}>
            <View
              style={[
                styles.textStack,
                type === "subscription" && {
                  backgroundColor: "#D0DDC8",
                },
              ]}
            >
              <Ionicons
                name="card-outline"
                size={30}
                color={type === "subscription" ? "#2C5818" : "#EEF8E9"}
              />
              <Text
                style={[
                  styles.textStackBar,
                  type === "subscription" && {
                    color: "#2C5818",
                  },
                ]}
              >
                Subscription
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TitleProfile;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  photoContainer: {
    alignItems: "center",
  },

  logoutContainer: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 12,
    paddingTop: 10,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "28%",
    backgroundColor: "#4B643F",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  textButton: {
    fontSize: 15,
    fontFamily: "InterBold",
    color: "white",
    marginLeft: 6,
  },

  photo: {
    backgroundColor: "#4B643F",
    borderRadius: 100,
    padding: 3,
    marginTop: -20,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  data: {
    margin: 15,
    alignItems: "center",
  },
  name: {
    fontSize: 25,
    fontFamily: "InterBold",
    color: "#2C5818",
  },
  email: {
    fontSize: 25,
    fontFamily: "InterMedium",
  },
  bar: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#7D9071",
    borderRadius: 100,
    paddingLeft: 5,
    paddingRight: 5,
  },
  textStack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 5,
    padding: 3,
    borderRadius: 100,
  },
  textStackBar: {
    color: "#EEF8E9",
    fontSize: 17,
    fontFamily: "InterMedium",
  },
});
