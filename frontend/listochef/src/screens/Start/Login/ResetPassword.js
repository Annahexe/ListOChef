import { useState, useContext } from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import Toast from "react-native-toast-message";
import Context from "../../../context/Context";
import OnboardingCard from "../../../components/OnboardingCard";
import ItemInput from "../../../components/ItemInput";
import PrimaryButton from "../../../components/PrimaryButton";
import { isRequired, isEmail, minLength, matches } from "../../../utils/validators";
import { postData } from "../../../services/services";

/**
 * ResetPassword screen that allows the user to reset their password.
 * The process is divided into two steps: first requesting a reset code by email,
 * and then confirming the code with a new password.
 *
 * @param {Object} props - Navigation props.
 * @returns {JSX.Element} Reset Password screen.
 */
const ResetPassword = (props) => {
  const { route } = useContext(Context);

  // Controls password visibility for the new password fields.
  const [showPassword, setShowPassword] = useState(false);

  // Stores the email used to request the reset password code.
  const [emailData, setEmailData] = useState({
    email: "",
  });

  // Stores the reset code and the new password data.
  const [resetPasswordData, setResetPasswordData] = useState({
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Stores validation error messages for each form field.
  const [errors, setErrors] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Controls whether the screen shows the email step or the code/password step.
  const [isSecondStep, setIsSecondStep] = useState(false);

  // Checks if the reset password petition is loading to show a loading state.
  const [isLoading, setIsLoading] = useState(false);

  /** Validates the email field in the first step. @returns {boolean} */
  const validateFormFirstStep = () => {
    const newErrors = {
      email: isRequired(emailData.email) || isEmail(emailData.email),
    };

    setErrors(newErrors);
    return !newErrors.email;
  };

  /**
   * Validates the reset code and new password fields in the second step.
   * Checks required fields, minimum password length and password confirmation.
   *
   * @returns {boolean} True if the second step form is valid, false otherwise.
   */
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

  /**
   * Validates the email and sends the forgot password request.
   * If the request succeeds, moves the screen to the second step.
   * Shows an error toast if the request fails.
   */
  const onSendEmail = async () => {
    let isValid = validateFormFirstStep();
    if (!isValid) return;

    setIsLoading(true);

    let isSuccess = await sendEmailForgotPassword();

    setIsLoading(false);

    if (isSuccess) {
      setIsSecondStep(true);
    } else {
      Toast.show({
        type: "error",
        text1: "Error reset password.",
        text2: "There was an error resetting your password.",
      });
    }
  };

  /**
   * Sends a POST request to ask the backend for a reset password code.
   *
   * @returns {Promise<boolean>} True if status is 200, false otherwise.
   */
  const sendEmailForgotPassword = async () => {
    const response = await postData(route + "/forgotPassword", emailData);
    if (!response) return false;

    const [status] = response;

    if (status === 200) {
      return true;
    }

    return false;
  };

  /**
   * Validates the reset code and new password data.
   * Sends the reset password request to the backend.
   * On success, clears the form, navigates to Login and shows a success toast.
   */
  const onConfirmResetPassword = async () => {
    const isValid = validateFormSecondStep();
    if (!isValid) return;

    setIsLoading(true);

    const { confirmNewPassword, ...resetPasswordWithoutConfirm } = resetPasswordData;

    const dataToSendResetPassword = {
      ...emailData,
      ...resetPasswordWithoutConfirm,
    };

    let isSuccess = await sendResetPasswordPetition(dataToSendResetPassword);

    setIsLoading(false);

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
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Success!",
          text2: "Password reset successfully.",
        });
      }, 400);
    } else {
      Toast.show({
        type: "error",
        text1: "Error validating code.",
        text2: "Please introduce the code sent to your email.",
      });
    }
  };

  /**
   * Sends a POST request to update the user's password.
   *
   * @param {Object} dataToSendResetPassword - Email, reset code and new password.
   * @returns {Promise<boolean>} True if status is 200, false otherwise.
   */
  const sendResetPasswordPetition = async (dataToSendResetPassword) => {
    const response = await postData(route + "/resetPassword", dataToSendResetPassword);
    if (!response) return false;

    const [status] = response;

    if (status === 200) {
      return true;
    }

    return false;
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
              <PrimaryButton buttonText={"Send email"} onPress={onSendEmail} isLoading={isLoading}></PrimaryButton>
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
              onChangeText={(text) =>
                setResetPasswordData((prev) => ({
                  ...prev,
                  confirmNewPassword: text,
                }))
              }
              keyboardType="default"
              style={{ fontSize: 16 }}
              error={errors.confirmNewPassword}
            />
            <View style={styles.buttonContainer}>
              <PrimaryButton buttonText={"Confirm"} onPress={onConfirmResetPassword} isLoading={isLoading}></PrimaryButton>
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
