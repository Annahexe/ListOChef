import { useState } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { isRequired, isEmail, minLength, matches } from "../../../utils/validators";

const ResetPassword = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailData, setEmailData] = useState({
    email: "",
  });
  const [resetPasswordData, setResetPasswordData] = useState({
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isSecondStep, setIsSecondStep] = useState(false);

  const validateFormFirstStep = () => {
    const newErrors = {
      email: isRequired(emailData.email) || isEmail(emailData.email),
    };

    setErrors(newErrors);
    return !newErrors.email;
  };

  const validateFormSecondStep = () => {
    const newErrors = {
      code: isRequired(resetPasswordData.code),
      newPassword: isRequired(resetPasswordData.newPassword) || minLength(resetPasswordData.newPassword, 4),
      confirmNewPassword:
        isRequired(resetPasswordData.confirmNewPassword) ||
        minLength(resetPasswordData.confirmNewPassword, 4) ||
        matches(resetPasswordData.newPassword, resetPasswordData.confirmNewPassword, "new passwords"),
    };

    setErrors(newErrors);
    return !newErrors.code && !newErrors.newPassword && !newErrors.confirmNewPassword;
  };

  const onSendEmail = () => {
    const isValid = validateFormFirstStep();
    if (!isValid) return;
    console.log(emailData); //TODO: here it sends petition to reset Password
    // isSuccess = responseFromPost
    let isSuccess = true;
    if (isSuccess) {
      setIsSecondStep(true);
    } else {
      alert("There was an error resetting your password.");
    }
  };

  const onConfirmResetPassword = () => {
    const isValid = validateFormSecondStep();
    if (!isValid) return;
    console.log(resetPasswordData); //TODO: here it sends petition to reset Password
    // isSuccess = responseFromPost
    let isSuccess = true;
    if (isSuccess) {
      setResetPasswordData({
        code: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setErrors({
        email: "",
        code: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsSecondStep(false);

      props.navigation.navigate("Login");
      alert("Password reset successfully!");
    }
  };

  return (
    <OnboardingCard pageTitle="Reset Password" titleStyle={{ fontSize: 36 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {!isSecondStep && (
          <>
            <Text style={styles.smallText}>We will email you a link to reset your password.</Text>
            <ItemInput
              label="E-MAIL:"
              placeholder="E-Mail"
              value={emailData.email}
              onChangeText={(text) => setEmailData((prev) => ({ ...prev, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={{ fontSize: 16 }}
              error={errors.email}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton buttonText={"Send email"} onPress={onSendEmail}></PrimaryButton>
            </View>
          </>
        )}
        {isSecondStep && (
          <>
            <Text style={styles.smallText}>We have sent you a code to: {emailData.email}</Text>
            <ItemInput
              label="CODE:"
              placeholder="Code"
              value={resetPasswordData.code}
              onChangeText={(text) => setResetPasswordData((prev) => ({ ...prev, code: text }))}
              keyboardType="default"
              style={{ fontSize: 16 }}
              error={errors.code}
            />
            <ItemInput
              label="NEW PASSWORD:"
              placeholder="New password"
              value={resetPasswordData.newPassword}
              eye={true}
              onPressEye={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
              onChangeText={(text) => setResetPasswordData((prev) => ({ ...prev, newPassword: text }))}
              keyboardType="default"
              style={{ fontSize: 16 }}
              error={errors.newPassword}
            />
            <ItemInput
              label="CONFIRM NEW PASSWORD:"
              placeholder="Confirm new password"
              value={resetPasswordData.confirmNewPassword}
              eye={true}
              onPressEye={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
              onChangeText={(text) => setResetPasswordData((prev) => ({ ...prev, confirmNewPassword: text }))}
              keyboardType="default"
              style={{ fontSize: 16 }}
              error={errors.confirmNewPassword}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton buttonText={"Confirm"} onPress={onConfirmResetPassword}></PrimaryButton>
            </View>
          </>
        )}

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
