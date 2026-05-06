import { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import Context from "../../../context/Context";
import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import {
  isRequired,
  isEmail,
  minLength,
  matches,
} from "../../../utils/validators";
import { postData } from "../../../services/services";

const Register = (props) => {
  const { route } = useContext(Context);
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
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: isRequired(registerData.name),
      surname: isRequired(registerData.surname),
      email: isRequired(registerData.email) || isEmail(registerData.email),
      password:
        isRequired(registerData.password) ||
        minLength(registerData.password, 4),
      confirmPassword:
        isRequired(registerData.confirmPassword) ||
        minLength(registerData.confirmPassword, 4) ||
        matches(
          registerData.password,
          registerData.confirmPassword,
          "passwords",
        ),
    };

    setErrors(newErrors);
    return (
      !newErrors.name &&
      !newErrors.surname &&
      !newErrors.email &&
      !newErrors.password &&
      !newErrors.confirmPassword
    );
  };

  const onCreateAccount = async () => {
    const isValid = validateForm();
    console.log("REGISTER DATA:", registerData);
    if (!isValid) {
      Toast.show({
        type: "error",
        text1: "Check your register details.",
        text2: "Please complete all fields correctly.",
      });
      return;
    }

    setIsLoading(true);

    const isSuccess = await sendRegisterRequest();

    setIsLoading(false);

    if (isSuccess) {
      props.navigation.navigate("Login");
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Account created!",
          text2: "You can now log in.",
        });
      }, 400);
    } else {
      Toast.show({
        type: "error",
        text1: "Register failed.",
        text2: "Please try again later or with different details.",
      });
    }
  };

  const sendRegisterRequest = async () => {
    const { confirmPassword, ...dataToSend } = registerData;
    console.log(dataToSend);

    const response = await postData(route + "/register", dataToSend);
    console.log(dataToSend);
    if (!response) return false;

    const [status] = response;
    if (status === 200) {
      console.log("return true");
      return true;
    }

    return false;
  };

  return (
    <OnboardingCard pageTitle="Register">
      <ScrollView showsVerticalScrollIndicator={false}>
        <ItemInput
          label="NAME:"
          placeholder="Name/s"
          value={registerData.name}
          onChangeText={(text) =>
            setRegisterData((prev) => ({ ...prev, name: text }))
          }
          keyboardType="default"
          error={errors.name}
        />
        <ItemInput
          label="SURNAME:"
          placeholder="Surname/s"
          value={registerData.surname}
          onChangeText={(text) =>
            setRegisterData((prev) => ({ ...prev, surname: text }))
          }
          keyboardType="default"
          error={errors.surname}
        />
        <ItemInput
          label="E-MAIL:"
          placeholder="E-Mail"
          value={registerData.email}
          onChangeText={(text) =>
            setRegisterData((prev) => ({ ...prev, email: text }))
          }
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.email}
        />
        <ItemInput
          label="PASSWORD:"
          placeholder="Password"
          value={registerData.password}
          eye={true}
          onPressEye={() => setShowPassword(!showPassword)}
          secureTextEntry={!showPassword}
          onChangeText={(text) =>
            setRegisterData((prev) => ({ ...prev, password: text }))
          }
          keyboardType="default"
          error={errors.password}
        />
        <ItemInput
          label="CONFIRM PASSWORD:"
          placeholder="Confirm Password"
          value={registerData.confirmPassword}
          eye={true}
          onPressEye={() => setShowPassword(!showPassword)}
          secureTextEntry={!showPassword}
          onChangeText={(text) =>
            setRegisterData((prev) => ({ ...prev, confirmPassword: text }))
          }
          keyboardType="default"
          error={errors.confirmPassword}
        />

        <Text style={styles.smallText}>By registering you agree to our</Text>
        <Pressable onPress={() => props.navigation.navigate("TermsConditions")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>
            Terms and Conditions
          </Text>
        </Pressable>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            buttonText="Create account"
            onPress={onCreateAccount}
            isLoading={isLoading}
          />
        </View>

        <Text style={styles.smallText}>Do you already have an account?</Text>
        <Pressable onPress={() => props.navigation.navigate("Login")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>Login</Text>
        </Pressable>
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
