import { View, StyleSheet, Keyboard, Alert, Pressable, Text } from "react-native";
import { useState, useContext, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Context from "../../context/Context";
import ItemInput from "../../components/ItemInput";
import TitleModalScreen from "../../components/TitleModalScreen";
import ModalButtons from "../../components/ModalButtons";

import { isRequired, minLength, matches } from "../../utils/validators";

const INITIAL_ERRORS = {
  name: "",
  surname: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const EditProfile = ({ navigation }) => {
  const { user, setUser } = useContext(Context);

  const [changePwd, setChangePwd] = useState(false);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState(INITIAL_ERRORS);

  useEffect(() => {
    setForm({
      name: user.name || "",
      surname: user.surname || "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }, [user]);

  const trimmedName = form.name.trim();
  const trimmedSurname = form.surname.trim();

  const hasProfileChanges = trimmedName !== (user.name || "") || trimmedSurname !== (user.surname || "");

  const isPasswordFormComplete = form.oldPassword.trim() !== "" && form.newPassword.trim() !== "" && form.confirmNewPassword.trim() !== "";

  const isFormComplete = hasProfileChanges || (changePwd && isPasswordFormComplete);

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

  const validatePasswordForm = () => {
    const newErrors = {
      ...INITIAL_ERRORS,
      oldPassword: isRequired(form.oldPassword) || minLength(form.oldPassword, 4) || matches(form.oldPassword, user.password, "old password"),
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

  const onSaved = () => {
    const profileIsValid = validateProfileForm();

    let passwordIsValid = true;
    if (changePwd) {
      passwordIsValid = validatePasswordForm();
    }

    if (!profileIsValid) {
      alert("Please fill in the profile fields correctly");
      return;
    }

    if (!passwordIsValid) {
      alert("Please check the password fields");
      return;
    }

    const payload = {};

    if (trimmedName !== (user.name || "")) {
      payload.name = trimmedName;
    }

    if (trimmedSurname !== (user.surname || "")) {
      payload.surname = trimmedSurname;
    }

    if (changePwd) {
      payload.oldPassword = form.oldPassword;
      payload.newPassword = form.newPassword;
    }

    if (Object.keys(payload).length === 0) {
      alert("No changes to save");
      return;
    }

    Alert.alert("Attention", "Are you sure you want to save these changes?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Save",
        onPress: () => {
          console.log("EDIT PROFILE REQUEST:", payload);


          setUser((prev) => ({
            ...prev,
            ...(payload.name ? { name: payload.name } : {}),
            ...(payload.surname ? { surname: payload.surname } : {}),
            ...(payload.newPassword ? { password: payload.newPassword } : {}),
          }));

          Keyboard.dismiss();
          navigation.goBack();
        },
      },
    ]);
  };

  const onChangePwd = () => {
    setChangePwd(true);
    resetPasswordFields();
  };

  const onCancelChangePwd = () => {
    setChangePwd(false);
    resetPasswordFields();
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <TitleModalScreen title={"Edit profile"} onPress={() => navigation.goBack()} />

        <KeyboardAwareScrollView
          style={styles.scrollContainer}
          nestedScrollEnabled={true} //perimte Scroll dentro de Scroll
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

        <ModalButtons onCancel={() => navigation.goBack()} onSave={onSaved} isFormComplete={isFormComplete} />
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
