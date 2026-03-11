import { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import Context from "../../../context/Context";
import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { isRequired, isEmail, minLength } from "../../../utils/validators";
import { postDataOnboarding } from "../../../services/services";

const Login = (props) => {
  const { token, setToken } = useContext(Context);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      email: isRequired(loginData.email) || isEmail(loginData.email),
      password: isRequired(loginData.password) || minLength(loginData.password, 4),
    };

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const onLogin = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    console.log(loginData);

    const isSuccess = await sendLoginRequest();

    if (isSuccess) {
      props.navigation.navigate("Home");
    } else {
      alert("Failed login. :( Try again");
    }
  };

  const sendLoginRequest = async () => {
    const response = await postDataOnboarding("http://98.84.207.18:8080/ListOChef/login", loginData);

    if (!response) {
      setIsLoginSuccess(false);
      return false;
    }

    const [status, tokenValue] = response;

    setToken(tokenValue);
    console.log("token from response:", tokenValue);

    const success = status === 200;

    setIsLoginSuccess(success);
    return success;
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
