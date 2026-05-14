import { View, StyleSheet, Keyboard, Alert, Pressable, Text } from "react-native";
import { useState, useContext, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

import Context from "../../context/Context";
import ItemInput from "../../components/ItemInput";
import TitleModalScreen from "../../components/TitleModalScreen";
import ModalButtons from "../../components/ModalButtons";
import { postDataToken } from "../../services/services";

import { isRequired, minLength, matches } from "../../utils/validators";

/** Base object used to reset and store form validation errors. */
const INITIAL_ERRORS = {
  name: "",
  surname: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

/**
 * EditProfile modal screen that allows the user to update profile information.
 * The user can edit their name and surname, and optionally change their password.
 * Validates the form before sending profile or password updates to the backend.
 *
 * @param {Object} navigation - Navigation prop for closing the modal after saving or cancelling.
 * @returns {JSX.Element} Edit Profile modal screen.
 */
const EditProfile = ({ navigation }) => {
  const { route, token, user, setUser } = useContext(Context);

  // Controls whether the password change fields are displayed.
  const [changePwd, setChangePwd] = useState(false);

  // Stores all profile and password form inputs.
  const [form, setForm] = useState({
    name: "",
    surname: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Stores validation error messages for each form field.
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  // Checks if the update petition is loading to show a loading state.
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Loads the current user data into the form whenever the user context changes.
   * Password fields are always reset for security.
   */
  useEffect(() => {
    setForm({
      name: user.name || "",
      surname: user.surname || "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }, [user]);

  /** Name without extra spaces at the beginning or end. */
  const trimmedName = form.name.trim();

  /** Surname without extra spaces at the beginning or end. */
  const trimmedSurname = form.surname.trim();

  /** True if the user changed their name or surname. */
  const hasProfileChanges = trimmedName !== (user.name || "") || trimmedSurname !== (user.surname || "");

  /** True when all password fields are filled. */
  const isPasswordFormComplete = form.oldPassword.trim() !== "" && form.newPassword.trim() !== "" && form.confirmNewPassword.trim() !== "";

  /** True when there are profile changes or a complete password change form. */
  const isFormComplete = hasProfileChanges || (changePwd && isPasswordFormComplete);

  /**
   * Validates the profile fields.
   * Checks that name and surname are not empty.
   *
   * @returns {boolean} True if profile fields are valid, false otherwise.
   */
  const validateProfileForm = () => {
    const newErrors = {
      ...INITIAL_ERRORS,
      name: isRequired(form.name),
      surname: isRequired(form.surname),
    };

    setErrors((prev) => ({
      ...prev,
      name: newErrors.name,
      surname: newErrors.surname,
    }));

    return !newErrors.name && !newErrors.surname;
  };

  /**
   * Validates the password fields.
   * Checks old password, new password length and password confirmation.
   *
   * @returns {boolean} True if password fields are valid, false otherwise.
   */
  const validatePasswordForm = () => {
    const newErrors = {
      ...INITIAL_ERRORS,
      oldPassword: isRequired(form.oldPassword) || minLength(form.oldPassword, 4),
      newPassword: isRequired(form.newPassword) || minLength(form.newPassword, 4),
      confirmNewPassword: isRequired(form.confirmNewPassword) || matches(form.confirmNewPassword, form.newPassword, "passwords"),
    };

    setErrors((prev) => ({
      ...prev,
      oldPassword: newErrors.oldPassword,
      newPassword: newErrors.newPassword,
      confirmNewPassword: newErrors.confirmNewPassword,
    }));

    return !newErrors.oldPassword && !newErrors.newPassword && !newErrors.confirmNewPassword;
  };

  /**
   * Clears all password fields and removes password validation errors.
   * Used when enabling or cancelling the password change section.
   */
  const resetPasswordFields = () => {
    setForm((prev) => ({
      ...prev,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }));

    setErrors((prev) => ({
      ...prev,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    }));
  };

  /**
   * Validates the form and asks the user to confirm the update.
   * Sends profile data and/or password data to the backend depending on the changes made.
   * Updates the local user context and closes the modal on success.
   */
  const onSaved = () => {
    const profileIsValid = validateProfileForm();
    const passwordIsValid = changePwd ? validatePasswordForm() : true;

    if (!profileIsValid) {
      Toast.show({
        type: "error",
        text1: "Please fill in the profile fields correctly",
      });
      return;
    }

    if (!passwordIsValid) {
      Toast.show({
        type: "error",
        text1: "Please check the password field",
      });
      return;
    }

    if (!hasProfileChanges && !changePwd) {
      Toast.show({
        type: "info",
        text1: "No changes to save",
      });
      return;
    }

    Alert.alert("Attention", "Are you sure you want to save these changes?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Save",
        onPress: async () => {
          try {
            setIsLoading(true);

            if (hasProfileChanges) {
              const profilePayload = {
                name: trimmedName,
                surname: trimmedSurname,
              };

              const okProfile = await changeAllDataRequest(profilePayload);

              if (!okProfile) {
                Toast.show({
                  type: "error",
                  text1: "Profile update failed",
                  text2: "Please try again later.",
                });
                return;
              }
            }

            if (changePwd) {
              const passwordPayload = {
                currentPassword: form.oldPassword,
                newPassword: form.newPassword,
              };

              const okPassword = await changePasswordRequest(passwordPayload);

              if (!okPassword) {
                Toast.show({
                  type: "error",
                  text1: "Password update failed",
                  text2: "Please try again later.",
                });
                return;
              }
            }

            setUser((prev) => ({
              ...prev,
              name: trimmedName,
              surname: trimmedSurname,
              ...(changePwd ? { password: form.newPassword } : {}),
            }));
            setIsLoading(false);
            navigation.goBack();
            setTimeout(() => {
              Toast.show({
                type: "success",
                text1: "Success.",
                text2: "Your profile has been updated successfully.",
              });
            }, 400);
          } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong");
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  /**
   * Enables the password change section and clears previous password values.
   */
  const onChangePwd = () => {
    setChangePwd(true);
    resetPasswordFields();
  };

  /**
   * Disables the password change section and clears previous password values.
   */
  const onCancelChangePwd = () => {
    setChangePwd(false);
    resetPasswordFields();
  };

  /**
   * Sends a request to update the user's profile data.
   *
   * @param {Object} formData - Profile data containing name and surname.
   * @returns {Promise<boolean>} True if status is 200 or 201, false otherwise.
   */
  const changeAllDataRequest = async (formData) => {
    const response = await postDataToken(route + "/editProfile", formData, token);

    if (!response) {
      console.log("NO RESPONSE");
      return false;
    }

    const [status] = response;

    return status === 200 || status === 201;
  };

  /**
   * Sends a request to update the user's password.
   *
   * @param {Object} formData - Password data containing currentPassword and newPassword.
   * @returns {Promise<boolean>} True if status is 200 or 201, false otherwise.
   */
  const changePasswordRequest = async (formData) => {
    const response = await postDataToken(route + "/changePassword", formData, token);

    if (!response) {
      console.log("NO RESPONSE");
      return false;
    }

    const [status] = response;

    return status === 200 || status === 201;
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <TitleModalScreen title={"Edit profile"} onPress={() => navigation.goBack()} />

        <KeyboardAwareScrollView
          style={styles.scrollContainer}
          nestedScrollEnabled={true} // Allows Scroll inside Scroll
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={60}
          enableOnAndroid={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <ItemInput
            label="Name:"
            placeholder="John"
            value={form.name}
            onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
            keyboardType="default"
            error={errors.name}
          />

          <ItemInput
            label="Surname:"
            placeholder="Doe"
            value={form.surname}
            onChangeText={(text) => setForm((prev) => ({ ...prev, surname: text }))}
            keyboardType="default"
            error={errors.surname}
          />

          <Pressable style={styles.button} onPress={changePwd ? onCancelChangePwd : onChangePwd}>
            <Text style={styles.textButton}>{changePwd ? "Cancel Change Password" : "Change Password"}</Text>
          </Pressable>

          {changePwd && (
            <>
              <Text style={styles.sectionText}>Enter your new password and confirm it below.</Text>

              <ItemInput
                label="Old Password:"
                placeholder="Old password"
                value={form.oldPassword}
                eye={true}
                onChangeText={(text) => setForm((prev) => ({ ...prev, oldPassword: text }))}
                keyboardType="default"
                error={errors.oldPassword}
              />

              <ItemInput
                label="New Password:"
                placeholder="New password"
                value={form.newPassword}
                eye={true}
                onChangeText={(text) => setForm((prev) => ({ ...prev, newPassword: text }))}
                keyboardType="default"
                error={errors.newPassword}
              />

              <ItemInput
                label="Confirm New Password:"
                placeholder="Confirm new password"
                value={form.confirmNewPassword}
                eye={true}
                onChangeText={(text) => setForm((prev) => ({ ...prev, confirmNewPassword: text }))}
                keyboardType="default"
                error={errors.confirmNewPassword}
              />
            </>
          )}
        </KeyboardAwareScrollView>

        <ModalButtons onCancel={() => navigation.goBack()} onSave={onSaved} isFormComplete={isFormComplete} isLoading={isLoading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
    paddingVertical: 50,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    flex: 2,
  },
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 2,
    marginVertical: 15,
    paddingBottom: 50,
  },
  button: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#4B643F",
    marginHorizontal: "1%",
    marginVertical: "3%",
    padding: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  textButton: {
    fontSize: 20,
    fontFamily: "InterBold",
    color: "white",
    textAlign: "center",
  },
  sectionText: {
    fontSize: 16,
    fontFamily: "InterMedium",
    color: "#4B643F",
  },
});

export default EditProfile;
