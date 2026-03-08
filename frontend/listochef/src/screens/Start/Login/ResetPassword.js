import { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { isRequired, isEmail } from "../../../utils/validators";

const ResetPassword = (props) => {
  const [emailData, setEmailData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

  const validateForm = () => {
    const newErrors = { email: isRequired(emailData.email) || isEmail(emailData.email) };
    setErrors(newErrors);
    return !newErrors.email;
  };

  const onResetPassword = () => {
    const isValid = validateForm();
    if (!isValid) return;

    console.log(emailData); //TODO: here it sends petition to reset Password
    // isSuccess = responseFromPost
    let isSuccess = true;
    if (isSuccess) {
      props.navigation.navigate("Login");
    }
  };

  return (
    <OnboardingCard pageTitle="Reset Password" titleStyle={{ fontSize: 36 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.smallText}>We will email you a link to reset your password.</Text>
        <ItemInput
          label="E-MAIL:"
          placeholder="E-Mail"
          value={emailData.email}
          onChangeText={(text) => setEmailData((prev) => ({ ...prev, email: text }))}
          keyboardType="default"
          style={{ fontSize: 16 }}
          error={errors.email}
        />
        <View style={styles.buttonContainer}>
          <PrimaryButton buttonText={"Send email"} onPress={onResetPassword}></PrimaryButton>
        </View>

        <Pressable onPress={() => props.navigation.navigate("Start")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>Return to home</Text>
        </Pressable>

        <Pressable onPress={() => props.navigation.navigate("Login")}>
          <Text style={[styles.smallText, { color: "#5A983D" }]}>Go to Login</Text>
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
    marginVertical: "2%",
    fontSize: 16,
    fontFamily: "MontserratRegular",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "auto",
    marginBottom: "3%",
  },
});
export default ResetPassword;
