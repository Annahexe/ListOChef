import { View, StyleSheet, Keyboard, Alert, Pressable, Text } from "react-native";
import { useState, useContext, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Context from "../../context/Context";
import ItemInput from "../../components/ItemInput";
import TitleModalScreen from "../../components/TitleModalScreen";
import ModalButtons from "../../components/ModalButtons";

import { isRequired, minLength, matches } from "../../utils/validators";

const EditProfile = ({ navigation }) => {
  const { user, setUser } = useContext(Context);

  const [showPassword, setShowPassword] = useState(false);
  const [changePwd, setChangePwd] = useState(false);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setForm({
      name: user.name || "",
      surname: user.surname || "",
      password: "",
      confirmPassword: "",
    });
  }, [user]);

  const hasProfileChanges = form.name.trim() !== (user.name || "") || form.surname.trim() !== (user.surname || "");

  const isPasswordFormComplete = form.password.trim() !== "" && form.confirmPassword.trim() !== "";

  const isFormComplete = changePwd ? isPasswordFormComplete : hasProfileChanges;

  const validateProfileForm = () => {
    const newErrors = {
      name: isRequired(form.name),
      surname: isRequired(form.surname),
      password: "",
      confirmPassword: "",
    };

    setErrors(newErrors);

    return !newErrors.name && !newErrors.surname;
  };

  const validatePasswordForm = () => {
    const newErrors = {
      name: "",
      surname: "",
      password: isRequired(form.password) || minLength(form.password, 6),
      confirmPassword: isRequired(form.confirmPassword) || matches(form.confirmPassword, form.password, "passwords"),
    };

    setErrors(newErrors);

    return !newErrors.password && !newErrors.confirmPassword;
  };

  const saveProfileChanges = () => {
    const isValid = validateProfileForm();

    if (!isValid) {
      alert("Please fill in all required fields correctly");
      return;
    }

    const profileChanges = {};

    if (form.name.trim() !== user.name) {
      profileChanges.name = form.name.trim();
    }

    if (form.surname.trim() !== user.surname) {
      profileChanges.surname = form.surname.trim();
    }

    if (Object.keys(profileChanges).length === 0) {
      alert("No changes to save");
      return;
    }

    Alert.alert("Attention", "Are you sure you want to save these profile changes?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Save",
        onPress: () => {
          console.log("PROFILE REQUEST:", profileChanges);

          setUser((prev) => ({
            ...prev,
            ...profileChanges,
          }));

          Keyboard.dismiss();
          navigation.goBack();
        },
      },
    ]);
  };

  const savePasswordChange = () => {
    const isValid = validatePasswordForm();

    if (!isValid) {
      alert("Please check the password fields");
      return;
    }

    const passwordPayload = {
      password: form.password,
    };

    Alert.alert("Attention", "Are you sure you want to change your password? This will modify your login details.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Save",
        onPress: () => {
          console.log("PASSWORD REQUEST:", passwordPayload);

          setUser((prev) => ({
            ...prev,
            password: form.password,
          }));

          Keyboard.dismiss();
          navigation.goBack();
        },
      },
    ]);
  };

  const onSaved = () => {
    if (changePwd) {
      savePasswordChange();
    } else {
      saveProfileChanges();
    }
  };

  const onChangePwd = () => {
    setChangePwd(true);
    setErrors({
      name: "",
      surname: "",
      password: "",
      confirmPassword: "",
    });
    setForm((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));
  };

  const onCancelChangePwd = () => {
    setChangePwd(false);
    setErrors({
      name: "",
      surname: "",
      password: "",
      confirmPassword: "",
    });
    setForm((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
    }));
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
                label="New Password:"
                placeholder="New password"
                value={form.password}
                eye={true}
                onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
                keyboardType="default"
                error={errors.password}
              />

              <ItemInput
                label="Confirm New Password:"
                placeholder="Confirm new password"
                value={form.confirmPassword}
                eye={true}
                onChangeText={(text) => setForm((prev) => ({ ...prev, confirmPassword: text }))}
                keyboardType="default"
                error={errors.confirmPassword}
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
