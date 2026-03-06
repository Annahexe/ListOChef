import { View, StyleSheet, Keyboard, Alert } from "react-native";

import { useState, useContext, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Context from "../../context/Context";
import ItemInput from "../../components/ItemInput";
import TitleModalScreen from "../../components/TitleModalScreen";
import ModalButtons from "../../components/ModalButtons";

const EditProfile = ({ navigation }) => {
  const { user, setUser } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
    }));
  }, []);

  const onSaved = () => {
    if (form.password === form.confirmPassword) {
      const editUser = {
        name: form.name,
        surname: form.surname,
        email: form.email,
        password: form.password,
      };

      Alert.alert(
        "Attention",
        "Are you sure you want to save the data? The change will modify your login details",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Save",
            onPress: () => {
              console.log(editUser);
              Keyboard.dismiss();
              navigation.goBack();
            },
          },
        ],
      );
    } else {
      alert("The passwords do not match");
    }
  };
  const isFormComplete = Object.values(form).every((value) => value);

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
          />

          <ItemInput
            label="Surname:"
            placeholder="Doe"
            value={form.surname}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, surname: text }))
            }
            keyboardType="default"
          />
          <ItemInput
            label="Email:"
            placeholder="user@gmail.com"
            value={form.email}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, email: text }))
            }
            keyboardType="default"
          />
          <ItemInput
            label="Password:"
            value={form.password}
            eye={true}
            onPressEye={() => setShowPassword(!showPassword)}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, password: text }))
            }
            keyboardType="default"
            secureTextEntry={!showPassword}
          />

          <ItemInput
            label="Confirm Password:"
            value={form.confirmPassword}
            eye={true}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, confirmPassword: text }))
            }
            keyboardType="default"
          />
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
});

export default EditProfile;
