import { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import Context from "../../../context/Context";
import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { isRequired, isEmail, minLength } from "../../../utils/validators";
import { postDataOnboarding } from "../../../services/services";

const Login = (props) => {
  const { route, token, setToken } = useContext(Context);
  const { ingredientTags, setIngredientTags } = useContext(Context);
  const { user, setUser, recipesSaved, setRecipesSaved } = useContext(Context);
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
    let isValid = validateForm();
    if (!isValid) return;

    console.log(loginData);

    let isSuccess = await sendLoginRequest();

    if (isSuccess) {
      props.navigation.navigate("Home");
    } else {
      alert("Failed login. :( Try again");
    }
    //props.navigation.navigate("Home");
  };

  const sendLoginRequest = async () => {
    const response = await postDataOnboarding(route + "/login", loginData);
    if (!response) return false;
    console.log("RESPONSE: " + response);

    const [status, jsonResponse] = response;
    console.log("STATUS: " + status);
    if (status === 200) {
      jsonResponse.listIngredientsTags.map((ingredient) => setIngredientTags((prev) => [...prev, ingredient.name]));
      setUser(jsonResponse.user);
      console.log("TOKEN:" + jsonResponse.token);
      setToken(jsonResponse.token);
      setRecipesSaved(jsonResponse.recipesSavedList);
      return true;
    }

    return false;
  };

const debugLogin = async () => {
  const debugCredentials = {
    email: "debugMail@mail.com",
    password: "12345",
  };
  setLoginData(debugCredentials);

  // const response = await postDataOnboarding(route + "/login", debugCredentials); //WHEN THE SERVER IS ONLINE REGISTER A DEBUG USER, AND PUT THE INFO FOR THE LOGIN and uncomment

  // if (!response) {
    console.log("SERVER **OFFLINE**, SETTING UP FAKE INFO FOR QUICK LOGIN");
    props.navigation.navigate("Home");
  // } else {   
  //   console.log("DEBUG RESPONSE: " + response);

  //   const [status, jsonResponse] = response;
  //   console.log("STATUS: " + status);

  //   if (status === 200) {
  //     jsonResponse.listIngredientsTags.map((ingredient) =>
  //       setIngredientTags((prev) => [...prev, ingredient.name])
  //     );
  //     setUser(jsonResponse.user);
  //     console.log("TOKEN:" + jsonResponse.token);
  //     setToken(jsonResponse.token);
  //     setRecipesSaved(jsonResponse.recipesSavedList);
  //     props.navigation.navigate("Home");
  //   } else {
  //     console.log("SERVER **ERROR**, SETTING UP FAKE INFO FOR QUICK LOGIN");
  //     props.navigation.navigate("Home");
  //     return;
  //   }
  // }
};

  return (
    <OnboardingCard pageTitle="Log in">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ItemInput
          label="E-MAIL:"
          placeholder="E-Mail"
          value={loginData.email}
          onChangeText={(text) => setLoginData((prev) => ({ ...prev, email: text }))}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
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
          error={errors.password}
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton buttonText={"Login"} onPress={onLogin}></PrimaryButton>
        </View>

        <Text style={styles.smallText} onPress={() => debugLogin()}>
          Don't remember your password?
        </Text>
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
