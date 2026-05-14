import { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import Context from "../../../context/Context";
import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { isRequired, isEmail, minLength } from "../../../utils/validators";
import { postDataOnboarding } from "../../../services/services";

/**
 * Login screen that authenticates the user and populates the app context
 * with user data, tags, categories, pantry, grocery list and tickets.
 * Navigates to Home on success.
 *
 * @param {Object} props - Navigation props.
 * @returns {JSX.Element} Login screen.
 */
const Login = (props) => {
  const {
    route,
    setToken,
    setIngredientTags,
    setUser,
    setRecipesSaved,
    setListRecipesTags,
    setSelectedIngredients,
    setPantryItems,
    setListRecipesCategories,
    setTicketsSaved,
  } = useContext(Context);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  /** Validates email and password fields. @returns {boolean} */
  const validateForm = () => {
    const newErrors = {
      email: isRequired(loginData.email) || isEmail(loginData.email),
      password:
        isRequired(loginData.password) || minLength(loginData.password, 4),
    };

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  /**
   * Validates the form and triggers the login request.
   * Navigates to Home on success or shows an error toast on failure.
   */
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

  /**
   * Sends login credentials to the backend and populates context with
   * user, token, tags, categories, pantry, grocery list and tickets.
   * @returns {Promise<boolean>} True if status 200, false otherwise.
   */
  const sendLoginRequest = async () => {
    const response = await postDataOnboarding(route + "/login", loginData);
    if (!response) return false;

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
      setToken(jsonResponse.token);
      setRecipesSaved(jsonResponse.recipesSavedList);
      setTicketsSaved(jsonResponse.user.myTicketsList);
      setListRecipesTags([
        { name: "All", icon: "" },
        ...jsonResponse.listRecipesTags.map((tag) => ({
          name: tag.name,
          icon: "",
        })),
      ]);

      setListRecipesCategories(jsonResponse.listRecipesCategories);
      setSelectedIngredients(jsonResponse.user.myGroceryList);
      setPantryItems(jsonResponse.user.myPantryList);
      return true;
    }

    return false;
  };

  const debugLogin = async () => {
    const debugCredentials = {
      email: "adminpistacho@gmail.com",
      password: "12345",
    };
    setLoginData(debugCredentials);

    setIsLoading(true);
    const response = await postDataOnboarding(
      route + "/login",
      debugCredentials,
    );

    setIsLoading(false);
    if (!response) {
      Toast.show({
        type: "error",
        text1: "SERVER **OFFLINE**",
      });
      console.log("SERVER **OFFLINE**");
      props.navigation.navigate("Home");
    } else {

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
        setListRecipesTags([
          { name: "All", icon: "" },
          ...jsonResponse.listRecipesTags.map((tag) => ({
            name: tag.name,
            icon: "",
          })),
        ]);
        setListRecipesCategories(jsonResponse.listRecipesCategories);

        setToken(jsonResponse.token);
        setRecipesSaved(jsonResponse.recipesSavedList);
        setTicketsSaved(jsonResponse.user.myTicketsList);
        setSelectedIngredients(jsonResponse.user.myGroceryList);
        setPantryItems(jsonResponse.user.myPantryList);
        props.navigation.navigate("Home");
      } else {
        Toast.show({
          type: "error",
          text1: "SERVER **ERROR**",
        });
        console.log("SERVER **ERROR**");
        props.navigation.navigate("Home");
        return;
      }
    }
  };

  return (
    <OnboardingCard pageTitle="Log in">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ItemInput
          label="E-MAIL:"
          placeholder="E-Mail"
          value={loginData.email}
          onChangeText={(text) =>
            setLoginData((prev) => ({ ...prev, email: text }))
          }
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
          onChangeText={(text) =>
            setLoginData((prev) => ({ ...prev, password: text }))
          }
          keyboardType="default"
          error={errors.password}
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton
            buttonText="Login"
            onPress={onLogin}
            isLoading={isLoading}
          />
        </View>

        <Text style={styles.smallText} onPress={() => debugLogin()}>
          Don't remember your password?
        </Text>
        <Pressable onPress={() => props.navigation.navigate("ResetPassword")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>
            Click here
          </Text>
        </Pressable>

        <Text style={styles.smallText}>You still haven't registered?</Text>
        <Pressable onPress={() => props.navigation.navigate("Register")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>
            Register here
          </Text>
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
