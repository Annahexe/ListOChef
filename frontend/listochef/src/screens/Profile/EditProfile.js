import {
  View,
  StyleSheet,
  Keyboard,
  Alert,
  Pressable,
  Text,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Context from "../../context/Context";
import ItemInput from "../../components/ItemInput";
import TitleModalScreen from "../../components/TitleModalScreen";
import ModalButtons from "../../components/ModalButtons";
import { postDataToken } from "../../services/services";

import { isRequired, minLength, matches } from "../../utils/validators";

//Objeto base para errores del formulario (validaciones)
const INITIAL_ERRORS = {
  name: "",
  surname: "",
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

const EditProfile = ({ navigation }) => {
  const { route, token, user, setUser } = useContext(Context);

  //Controla que el usuario quiera cambiar o no la contraseña, para pintar o no campos adicionales
  const [changePwd, setChangePwd] = useState(false);

  //Guarda los inputs totales del formulario
  const [form, setForm] = useState({
    name: "",
    surname: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  //Guarda los errores de los campos, sincronizado con las validaciones
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  //Si se cambia el user, se recargan los datos
  useEffect(() => {
    setForm({
      name: user.name || "",
      surname: user.surname || "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }, [user]);

  //Elimina espacios del nombre y apellido
  const trimmedName = form.name.trim();
  const trimmedSurname = form.surname.trim();

  //Comrpueba si se ha modificado algo, evitando llamadas innecesarias al backend
  const hasProfileChanges =
    trimmedName !== (user.name || "") ||
    trimmedSurname !== (user.surname || "");

  //Comprueba si los campos de password están rellenos
  const isPasswordFormComplete =
    form.oldPassword.trim() !== "" &&
    form.newPassword.trim() !== "" &&
    form.confirmNewPassword.trim() !== "";

  //habilita el boton SAVE
  const isFormComplete =
    hasProfileChanges || (changePwd && isPasswordFormComplete);

  //Validaciones nombre y apellido
  const validateProfileForm = () => {
    //Devuelve error si nombre o apellido estan vacios
    const newErrors = {
      ...INITIAL_ERRORS,
      name: isRequired(form.name),
      surname: isRequired(form.surname),
    };

    //guarda el error si lo hay
    setErrors((prev) => ({
      ...prev,
      name: newErrors.name,
      surname: newErrors.surname,
    }));

    //Si no hay error devuleve true
    return !newErrors.name && !newErrors.surname;
  };

  //Validaciones contraseña
  const validatePasswordForm = () => {
    //Devuelve error si contraseña estan vacios
    const newErrors = {
      ...INITIAL_ERRORS,
      oldPassword:
        isRequired(form.oldPassword) || minLength(form.oldPassword, 4), //es requerida y minimo 4 de long
      newPassword:
        isRequired(form.newPassword) || minLength(form.newPassword, 4),
      confirmNewPassword:
        isRequired(form.confirmNewPassword) ||
        matches(form.confirmNewPassword, form.newPassword, "passwords"), //comprueba que los dos campos de nueva contraseña coinciden
    };

    setErrors((prev) => ({
      ...prev,
      oldPassword: newErrors.oldPassword,
      newPassword: newErrors.newPassword,
      confirmNewPassword: newErrors.confirmNewPassword,
    }));

    return (
      !newErrors.oldPassword &&
      !newErrors.newPassword &&
      !newErrors.confirmNewPassword
    );
  };

  //Activa el cambio de pw y limpia valores o errores
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

  //guarda los cambios
  const onSaved = () => {
    //Ejecuta las validaciones
    const profileIsValid = validateProfileForm();
    const passwordIsValid = changePwd ? validatePasswordForm() : true;

    //VALIDACIONES (cuadrito en rojo) Si algo falla ejecuta el alert
    if (!profileIsValid) {
      Alert.alert("Error", "Please fill in the profile fields correctly");
      return;
    }

    if (!passwordIsValid) {
      Alert.alert("Error", "Please check the password fields");
      return;
    }

    // Si no hay nada que guardar
    if (!hasProfileChanges && !changePwd) {
      Alert.alert("Info", "No changes to save");
      return;
    }

    //Confirmar cambios
    Alert.alert("Attention", "Are you sure you want to save these changes?", [
      //boton cancelar
      { text: "Cancel", style: "cancel" },
      //boton guardar
      {
        text: "Save",
        onPress: async () => {
          try {
            // Actualizar todo el perfil
            if (hasProfileChanges) {
              //Los cambios
              const profilePayload = {
                name: trimmedName,
                surname: trimmedSurname,
              };

              console.log("PROFILE REQUEST:", profilePayload);

              const okProfile = await changeAllDataRequest(profilePayload);

              if (!okProfile) {
                Alert.alert("Error", "Profile update failed");
                return;
              }
            }

            // Cambiar contraseña solo
            if (changePwd) {
              //Los cambios
              const passwordPayload = {
                currentPassword: form.oldPassword,
                newPassword: form.newPassword,
              };

              console.log("PASSWORD REQUEST:", passwordPayload);

              const okPassword = await changePasswordRequest(passwordPayload);

              if (!okPassword) {
                Alert.alert("Error", "Password update failed");
                return;
              }
            }

            // Actualizar estado local para recargar página
            setUser((prev) => ({
              ...prev,
              name: trimmedName,
              surname: trimmedSurname,
              ...(changePwd ? { password: form.newPassword } : {}),
            }));

            Alert.alert(
              "Success",
              "Your profile has been updated successfully.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.goBack(),
                },
              ],
            );
          } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong");
          }
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

  //Llamada a back con todo
  const changeAllDataRequest = async (formData) => {
    console.log("SENDING PETITION CHANGEALLDATAREQUEST");

    const response = await postDataToken(
      route + "/editProfile",
      formData,
      token,
    );

    if (!response) {
      console.log("NO RESPONSE");
      return false;
    }

    const [status] = response;
    console.log("STATUS:", status);

    return status === 200 || status === 201;
  };

  //Llamada a back solo contraseña
  const changePasswordRequest = async (formData) => {
    console.log("SENDING PASSWORD REQUEST");

    const response = await postDataToken(
      route + "/changePassword",
      formData,
      token,
    );

    if (!response) {
      console.log("NO RESPONSE");
      return false;
    }

    const [status] = response;
    console.log("STATUS PASSWORD:", status);

    return status === 200 || status === 201;
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <TitleModalScreen
          title={"Edit profile"}
          onPress={() => navigation.goBack()}
        />

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
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, name: text }))
            }
            keyboardType="default"
            error={errors.name}
          />

          <ItemInput
            label="Surname:"
            placeholder="Doe"
            value={form.surname}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, surname: text }))
            }
            keyboardType="default"
            error={errors.surname}
          />

          <Pressable
            style={styles.button}
            onPress={changePwd ? onCancelChangePwd : onChangePwd}
          >
            <Text style={styles.textButton}>
              {changePwd ? "Cancel Change Password" : "Change Password"}
            </Text>
          </Pressable>

          {changePwd && (
            <>
              <Text style={styles.sectionText}>
                Enter your new password and confirm it below.
              </Text>

              <ItemInput
                label="Old Password:"
                placeholder="Old password"
                value={form.oldPassword}
                eye={true}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, oldPassword: text }))
                }
                keyboardType="default"
                error={errors.oldPassword}
              />

              <ItemInput
                label="New Password:"
                placeholder="New password"
                value={form.newPassword}
                eye={true}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, newPassword: text }))
                }
                keyboardType="default"
                error={errors.newPassword}
              />

              <ItemInput
                label="Confirm New Password:"
                placeholder="Confirm new password"
                value={form.confirmNewPassword}
                eye={true}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, confirmNewPassword: text }))
                }
                keyboardType="default"
                error={errors.confirmNewPassword}
              />
            </>
          )}
        </KeyboardAwareScrollView>

        <ModalButtons
          onCancel={() => navigation.goBack()}
          onSave={onSaved}
          isFormComplete={isFormComplete}
        />
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
