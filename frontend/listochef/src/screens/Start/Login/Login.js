import { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { isRequired, isEmail, minLength } from "../../../utils/validators";

const Login = (props) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: isRequired(loginData.email) || isEmail(loginData.email),
      password: isRequired(loginData.password) || minLength(loginData.password, 6),
    };

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const onLogin = () => {
    const isValid = validateForm();
    if (!isValid) return; //COMMENT THIS FOR TESTING TO SKIP VALIDATION

    console.log(loginData); //TODO: here it sends petition to login
    // isSuccess = responseFromPost
    let isSuccess = true;
    if (isSuccess) {
      props.navigation.navigate("Home");
    }
  };

  return (
    <OnboardingCard pageTitle="Log in">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ItemInput
          label="E-MAIL:"
          placeholder="E-Mail"
          value={loginData.email}
          onChangeText={(text) => setLoginData((prev) => ({ ...prev, email: text }))}
          keyboardType="default"
          style={{ fontSize: 16 }}
          error={errors.email}
        />
        <ItemInput
          label="PASSWORD:"
          placeholder="Password"
          value={loginData.password}
          eye={true}
          onPressEye={() => setShowPassword(!showPassword)}
          secureTextEntry={!showPassword}
          onChangeText={(text) => setLoginData((prev) => ({ ...prev, password: text }))}
          keyboardType="default"
          style={{ fontSize: 16 }}
          error={errors.password}
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton buttonText={"Login"} onPress={onLogin}></PrimaryButton>
        </View>

        <Text style={styles.smallText}>Don't remember your password?</Text>
        <Pressable onPress={() => props.navigation.navigate("ResetPassword")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>Click here</Text>
        </Pressable>

        <Text style={styles.smallText}>You still haven't registered?</Text>
        <Pressable onPress={() => props.navigation.navigate("Register")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>Register here</Text>
        </Pressable>
      </ScrollView>
    </OnboardingCard>
  );
};
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  smallText: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: "3%",
  },
});
export default Login;
