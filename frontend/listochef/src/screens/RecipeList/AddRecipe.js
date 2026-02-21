import { View, Text, Pressable, StyleSheet, Keyboard } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as ImagePicker from "expo-image-picker";

import PhotoPicker from "../../components/PhotoPicker";
import ItemInput from "../../components/ItemInput";
import TitleModalScreen from "../../components/TitleModalScreen";
import AutocompleteInput from "../../components/AutocompleteInput";
import AutocompleteList from "../../components/AutocompleteList";
import ModalButtons from "../../components/ModalButtons";

const AddRecipe = ({ navigation }) => {
  const [form, setForm] = useState({
    photo: null,
    name: "",
    type: "",
    steps: "",
    time: "",
    difficulty: "",
  });

  const [ingredientsList, setIngredientsList] = useState([
    "Pasta",
    "Tomato",
    "Tomato Sauce",
    "Minced meat",
    "Oil",
    "Olive oil",
    "Spices",
    "Onion",
    "Cheese",
    "Apple",
    "Orange",
    "Jam",
    "Egg",
  ]);
  const [tagsList, setTagsList] = useState([
    "Pasta",
    "Fish",
    "Vegetable",
    "Pork",
    "Beef",
    "Chicken",
    "Vegan",
  ]);
  const [ingredients, setIngredients] = useState([""]);
  const [tags, setTags] = useState([""]);

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

    const newRecipe = {
      recipeName: form.name,
      ingredients: ingredients,
      type: form.type,
      time: form.time,
      steps: form.steps,
      tags: tags,
      photo: form.photo,
      creationDate: today,
    };

    console.log(newRecipe);
    Keyboard.dismiss();
    return navigation.goBack();
  };

  const isFormComplete =
    Object.values(form).every((value) => value) &&
    ingredients.every((value) => value) &&
    tags.every((value) => value);

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <TitleModalScreen
          title={"New Recipe"}
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
          <PhotoPicker photo={form.photo} choosePhoto={choosePhoto} />

          <ItemInput
            label="Name"
            placeholder="Ex: Roast beef"
            value={form.name}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, name: text }))
            }
            keyboardType="default"
          />

          <AutocompleteList
            label="Ingredients"
            values={ingredients}
            setValues={setIngredients}
            options={ingredientsList}
            placeholder="Ex: Pasta"
          />

          <AutocompleteInput
            label="Type"
            placeholder="Ex: Breakfast"
            value={form.type}
            options={[
              "Breakfast",
              "Lunch",
              "Dinner",
              "Snack",
              "Dessert",
              "Brunch",
            ]}
            onSelect={(text) => setForm((prev) => ({ ...prev, type: text }))}
          />

          <ItemInput
            label="Steps to create:"
            placeholder="Step 1: ..."
            value={form.steps}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, steps: text }))
            }
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
                placeholder="Ex: 20 min"
                value={form.time}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, time: text }))
                }
                keyboardType="numeric"
              />
            </View>

            <View style={{ width: "45%" }}>
              <AutocompleteInput
                label="Difficulty"
                placeholder="Ex: Low "
                value={form.difficulty}
                options={["Low", "Medium", "Hard"]}
                onSelect={(text) =>
                  setForm((prev) => ({ ...prev, difficulty: text }))
                }
              />
            </View>
          </View>

          <AutocompleteList
            label="Tags"
            values={tags}
            setValues={setTags}
            options={tagsList}
            placeholder="Ex: Pasta"
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

export default AddRecipe;
