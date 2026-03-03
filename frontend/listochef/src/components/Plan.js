import { Text, Image, View, Pressable, StyleSheet } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const Plan = (props) => {
  const detailsFree = [
    "Basic access to the platform",
    "Create up to 10 recipes",
    "Email support",
    "Store up to 30 ingredients in your pantry",
  ];
  const detailsPremium = [
    "Total access to the platform",
    "Create unlimited recipes",
    "Email support and telephone support",
    "Store unlimited ingredients in your pantry",
  ];
  return (
    <View
      style={[
        styles.containerPlan,
        props.details !== "free" && { borderWidth: 3 },
      ]}
    >
      {props.details === "free" ? (
        <>
          <MaterialCommunityIcons
            name="lightning-bolt-outline"
            size={40}
            color="#2C5818"
          />
          <Text style={styles.type}>Free</Text>
          <Text style={styles.price}>0€/month</Text>
          {detailsFree.map((detail, index) => (
            <View key={index} style={styles.detail}>
              <FontAwesome6 name="check" size={24} color="#8ce563" />
              <Text style={styles.detailText}>{detail}</Text>
            </View>
          ))}
          <Pressable style={styles.buttonFree}>
            <Text style={styles.buttonTextFree}>Current Plan</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.popular}>Most Popular</Text>
          <MaterialCommunityIcons
            name="diamond-stone"
            size={40}
            color="#2C5818"
          />
          <Text style={styles.type}>Premium</Text>
          <Text style={styles.price}>4,99€/month</Text>
          {detailsPremium.map((detail, index) => (
            <View key={index} style={styles.detail}>
              <FontAwesome6 name="check" size={24} color="#8ce563" />
              <Text style={styles.detailText}>{detail}</Text>
            </View>
          ))}
          <Pressable style={styles.buttonPremium}>
            <Text style={styles.buttonTextPremium}>Hire Plan</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerPlan: {
    borderWidth: 1,
    borderColor: "#2C5818",
    borderRadius: 30,
    padding: 20,
    marginVertical: 10,
  },
  type: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: "#2C5818",
  },
  price: {
    fontSize: 36,
    fontFamily: "MontserratRegular",
    color: "#2C5818",
    marginBottom: 15,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  detailText: {
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: "MontserratRegular",
  },
  popular: {
    color: "white",
    backgroundColor: "#2C5818",
    marginTop: -33,
    width: "35%",
    alignSelf: "center",
    padding: 5,
    borderRadius: 10,
    textAlign: "center",
  },
  buttonFree: {
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#4B643F",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 20,
  },

  buttonTextFree: {
    fontSize: 15,
    fontFamily: "MontserratRegular",
    color: "black",
  },
  buttonPremium: {
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#2C5818",
    borderWidth: 1,
    borderColor: "#4B643F",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: -1, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  buttonTextPremium: {
    fontSize: 15,
    fontFamily: "MontserratBold",
    color: "white",
  },
});

export default Plan;
