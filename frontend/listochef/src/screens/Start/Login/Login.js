import { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import Toast from "react-native-toast-message";

import Context from "../../../context/Context";
import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { isRequired, isEmail, minLength } from "../../../utils/validators";
import { postDataOnboarding } from "../../../services/services";

const Login = (props) => {
  const { route, token, setToken } = useContext(Context);
  const { ingredientTags, setIngredientTags } = useContext(Context);
  const { user, setUser, recipesSaved, setRecipesSaved, setSelectedIngredients, setPantryItems } = useContext(Context);
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
  const [isLoading, setIsLoading] = useState(false);

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

    if (!isValid) {
      Toast.show({
        type: "error",
        text1: "Check your login details.",
        text2: "Please enter a valid email and password.",
      });
      return;
    }

    setIsLoading(true);

    const isSuccess = await sendLoginRequest();

    setIsLoading(false);

    if (isSuccess) {
      props.navigation.navigate("Home");
    } else {
      Toast.show({
        type: "error",
        text1: "Login failed.",
        text2: "Email or password is incorrect.",
      });
    }
  };

  const sendLoginRequest = async () => {
    const response = await postDataOnboarding(route + "/login", loginData);
    if (!response) return false;
    console.log("RESPONSE: ", response);

    const [status, jsonResponse] = response;
    if (status === 200) {
      setIngredientTags([
        { name: "All", icon: "" },
        ...jsonResponse.listIngredientsTags.map((ingredient) => ({
          name: ingredient.ingredientCategoryName,
          icon: ingredient.icon,
        })),
      ]);
      setUser(jsonResponse.user);
      console.log("TOKEN:", jsonResponse.token);
      setToken(jsonResponse.token);
      setRecipesSaved(jsonResponse.recipesSavedList);
      setSelectedIngredients(jsonResponse.user.myGroceryList);
      //setPantryItems(jsonResponse.user.myPantryList)
      return true;
    }

    return false;
  };

  const debugLogin = async () => {
    const debugCredentials = {
      email: "Adminpistacho@gmail.com",
      password: "12345",
    };
    setLoginData(debugCredentials);

    const response = await postDataOnboarding(route + "/login", debugCredentials);

    if (!response) {
      Toast.show({
        type: "error",
        text1: "SERVER **OFFLINE**",
        text2: "SETTING UP FAKE INFO FOR QUICK LOGIN.",
      });
      console.log("SERVER **OFFLINE**, SETTING UP FAKE INFO FOR QUICK LOGIN");
      props.navigation.navigate("Home");
    } else {
      console.log("DEBUG RESPONSE: " + response);

      const [status, jsonResponse] = response;

      if (status === 200) {
        setIngredientTags([
          { name: "All", icon: "" },
          ...jsonResponse.listIngredientsTags.map((ingredient) => ({
            name: ingredient.ingredientCategoryName,
            icon: ingredient.icon,
          })),
        ]);
        setUser(jsonResponse.user);
        console.log("TOKEN:" + jsonResponse.token);
        setToken(jsonResponse.token);
        setRecipesSaved(jsonResponse.recipesSavedList);
        setSelectedIngredients(jsonResponse.user.myGroceryList);
        //setPantryItems(jsonResponse.user.myPantryList)
        props.navigation.navigate("Home");
      } else {
        Toast.show({
          type: "error",
          text1: "SERVER **ERROR**",
          text2: "SETTING UP FAKE INFO FOR QUICK LOGIN.",
        });
        console.log("SERVER **ERROR**, SETTING UP FAKE INFO FOR QUICK LOGIN");
        props.navigation.navigate("Home");
        return;
      }
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
          <PrimaryButton buttonText="Login" onPress={onLogin} isLoading={isLoading} />
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
