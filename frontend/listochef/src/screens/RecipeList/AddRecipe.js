import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";

import PhotoPicker from "../../components/PhotoPicker";
import ItemInput from "../../components/ItemInput";

const AddRecipe = ({ navigation }) => {
  const [form, setForm] = useState({
    photo: null,
    name: "",
    type: "",
    steps: "",
    time: "",
    difficulty: "",
  });

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setForm((prev) => ({ ...prev, photo: result.assets[0].uri }));
    }
  };

  const onSaved = () => {
    const today = new Date();

    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const formattedDate = `${date}/${month}/${year}`;

    const newRecipe = {
      recipeName: form.name,
      type: form.type,
      time: form.time,
      steps: form.steps,
      photo: form.photo,
      creationDate: formattedDate,
    };

    console.log(newRecipe);
    return navigation.goBack();
  };

  const isFormComplete = Object.values(form).every((value) => value);

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text style={styles.title}>New Recipe</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={35} color="black" />
        </Pressable>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <PhotoPicker photo={form.photo} choosePhoto={choosePhoto} />
        <ItemInput
          label="Name"
          placeholder="Ex: Roast beef"
          value={form.name}
          onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
          keyboardType="default"
        />

        <ItemInput
          label="Type"
          placeholder="Ex: Breakfast, lunch, dinner..."
          value={form.type}
          onChangeText={(text) => setForm((prev) => ({ ...prev, type: text }))}
          keyboardType="default"
        />

        <ItemInput
          label="Steps to create:"
          placeholder="Step 1: ..."
          value={form.steps}
          onChangeText={(text) => setForm((prev) => ({ ...prev, steps: text }))}
          keyboardType="default"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "45%" }}>
            <ItemInput
              label="Time"
              placeholder="20 min"
              value={form.time}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, time: text }))
              }
              keyboardType="numeric"
            />
          </View>

          <View style={{ width: "45%" }}>
            <ItemInput
              label="Difficulty"
              placeholder="low"
              value={form.difficulty}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, difficulty: text }))
              }
              keyboardType="default"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.button, { backgroundColor: "#4B643F" }]}
        >
          <Text style={styles.textButton}>Cancel</Text>
        </Pressable>

        <Pressable
          style={[
            styles.button,
            { backgroundColor: isFormComplete ? "#4B643F" : "#85917F" },
          ]}
          onPress={isFormComplete ? onSaved : null}
        >
          <Text style={styles.textButton}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  titlecontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 2,
    marginVertical: 15,
    paddingBottom: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  button: {
    width: "48%",
    marginHorizontal: "1%",
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  textButton: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});

export default AddRecipe;
