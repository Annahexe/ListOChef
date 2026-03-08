import { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { isRequired, isEmail, minLength, matches } from "../../../utils/validators";

const Register = (props) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: isRequired(registerData.name),
      surname: isRequired(registerData.surname),
      email: isRequired(registerData.email) || isEmail(registerData.email),
      password: isRequired(registerData.password) || minLength(registerData.password, 6),
      confirmPassword:
        isRequired(registerData.confirmPassword) ||
        minLength(registerData.confirmPassword, 6) ||
        matches(registerData.password, registerData.confirmPassword, "passwords"),
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.surname && !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
  };

  const onCreateAccount = () => {
    const isValid = validateForm();
    if (!isValid) return; //COMMENT THIS FOR TESTING TO SKIP VALIDATION

    console.log(registerData); //TODO: here it sends petition to register
    // isSuccess = responseFromPost
    let isSuccess = true;
    if (isSuccess) {
      props.navigation.navigate("Home");
    }
  };

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
          error={errors.name}
        />
        <ItemInput
          label="SURNAME:"
          placeholder="Surname/s"
          value={registerData.surname}
          onChangeText={(text) => setRegisterData((prev) => ({ ...prev, surname: text }))}
          keyboardType="default"
          style={{ fontSize: 16 }}
          error={errors.surname}
        />
        <ItemInput
          label="E-MAIL:"
          placeholder="E-Mail"
          value={registerData.email}
          onChangeText={(text) => setRegisterData((prev) => ({ ...prev, email: text }))}
          keyboardType="default"
          style={{ fontSize: 16 }}
          error={errors.email}
        />
        <ItemInput
          label="PASSWORD:"
          placeholder="Password"
          value={registerData.password}
          eye={true}
          onPressEye={() => setShowPassword(!showPassword)}
          secureTextEntry={!showPassword}
          onChangeText={(text) => setRegisterData((prev) => ({ ...prev, password: text }))}
          keyboardType="default"
          style={{ fontSize: 16 }}
          error={errors.password}
        />
        <ItemInput
          label="CONFIRM PASSWORD:"
          placeholder="Confirm Password"
          value={registerData.confirmPassword}
          eye={true}
          onPressEye={() => setShowPassword(!showPassword)}
          secureTextEntry={!showPassword}
          onChangeText={(text) => setRegisterData((prev) => ({ ...prev, confirmPassword: text }))}
          keyboardType="default"
          style={{ fontSize: 16 }}
          error={errors.confirmPassword}
        />

        <Text style={styles.smallText}>
          By registering you agree to our
          <Pressable onPress={() => props.navigation.navigate("TermsConditions")}>
            <Text style={[styles.smallText, { color: "#5A983D" }]}>Terms and Conditions</Text>
          </Pressable>
        </Text>

        <View style={styles.buttonContainer}>
          <PrimaryButton buttonText={"Create account"} onPress={onCreateAccount}></PrimaryButton>
        </View>

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
  smallText: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: "3%",
  },
});
export default Register;
