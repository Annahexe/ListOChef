import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";

const Register = (props) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    difficulty: "",
  });

  return (
    <OnboardingCard pageTitle="Register">
      <ItemInput
        label="Name"
        placeholder="Name/s"
        value={registerData.name}
        onChangeText={(text) => setRegisterData((prev) => ({ ...prev, name: text }))}
        keyboardType="default"
      />
      <Text style={styles.smallText}>
        By registering you agree to our
        <Pressable onPress={() => props.navigation.navigate("TermsConditions")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>Terms and Conditions</Text>
        </Pressable>
      </Text>
      <Pressable style={styles.boton} onPress={() => props.navigation.navigate("Home")}>
        <Text>Ir a Home</Text>
      </Pressable>
      <Text style={styles.smallText}>
        Do you already have an account?
        <Pressable onPress={() => props.navigation.navigate("Login")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>Login</Text>
        </Pressable>
      </Text>
    </OnboardingCard>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  smallText: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    textAlign: "center",
  },
  boton: {
    alignSelf: "center",
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
});
export default Register;
