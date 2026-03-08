import { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";

const Register = (props) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <OnboardingCard pageTitle="Register">
      <ScrollView showsVerticalScrollIndicator={false}>
      <ItemInput
        label="NAME:"
        placeholder="Name/s"
        value={registerData.name}
        onChangeText={(text) => setRegisterData((prev) => ({ ...prev, name: text }))}
        keyboardType="default"
        style={{ fontSize: 16 }}
      />
      <ItemInput
        label="SURNAME:"
        placeholder="Surname/s"
        value={registerData.surname}
        onChangeText={(text) => setRegisterData((prev) => ({ ...prev, surname: text }))}
        keyboardType="default"
        style={{ fontSize: 16 }}
      />
      <ItemInput
        label="E-MAIL:"
        placeholder="E-Mail"
        value={registerData.email}
        onChangeText={(text) => setRegisterData((prev) => ({ ...prev, email: text }))}
        keyboardType="default"
        style={{ fontSize: 16 }}
      />
      <ItemInput
        label="PASSWORD:"
        placeholder="Password"
        value={registerData.password}
        onChangeText={(text) => setRegisterData((prev) => ({ ...prev, password: text }))}
        keyboardType="default"
        style={{ fontSize: 16 }}
      />
      <ItemInput
        label="CONFIRM PASSWORD:"
        placeholder="Confirm Password"
        value={registerData.confirmPassword}
        onChangeText={(text) => setRegisterData((prev) => ({ ...prev, confirmPassword: text }))}
        keyboardType="default"
        style={{ fontSize: 16 }}
      />
      <Text style={styles.smallText}>
        By registering you agree to our
        <Pressable onPress={() => props.navigation.navigate("TermsConditions")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>Terms and Conditions</Text>
        </Pressable>
      </Text>
      <PrimaryButton buttonText={"Create account"} onPress={() => props.navigation.navigate("Home")}></PrimaryButton>
      <Text style={styles.smallText}>
        Do you already have an account?
        <Pressable onPress={() => props.navigation.navigate("Login")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>Login</Text>
        </Pressable>
      </Text>
      </ScrollView>
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
