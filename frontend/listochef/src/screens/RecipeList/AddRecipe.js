import { View, Text, Pressable, StyleSheet, Keyboard, Dimensions, Platform } from "react-native";
import { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

import * as ImagePicker from "expo-image-picker";

import Context from "../../context/Context";
import PhotoPicker from "../../components/PhotoPicker";
import ItemInput from "../../components/ItemInput";
import TitleModalScreen from "../../components/TitleModalScreen";
import AutocompleteInput from "../../components/AutocompleteInput";
import AutocompleteList from "../../components/AutocompleteList";
import ModalButtons from "../../components/ModalButtons";

import { isRequired, isRequiredArray } from "../../utils/validators";
import { postDataToken } from "../../services/services";

const { height, width } = Dimensions.get("window");

const AddRecipe = ({ navigation }) => {
  const { token, route } = useContext(Context);
  const [form, setForm] = useState({
    photo: null,
    name: "",
    category: "",
    steps: "",
    time: "",
    difficulty: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    category: "",
    steps: "",
    time: "",
    difficulty: "",
    ingredients: "",
    tags: "",
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
  const [tagsList, setTagsList] = useState(["Pasta", "Fish", "Vegetable", "Pork", "Beef", "Chicken", "Vegan"]);
  const [ingredients, setIngredients] = useState([""]);
  const [tags, setTags] = useState([""]);

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];

      setForm((prev) => ({
        ...prev,
        photo: {
          uri: asset.uri,
          name: asset.fileName || `photo-${Date.now()}.jpg`,
          type: asset.mimeType || "image/jpeg",
        },
      }));
    }
  };

  const onSaved = async () => {
    console.log("ON SAVED PRESSED");
    const isValid = validateForm();

    if (!isValid) {
      Toast.show({
        type: "error",
        text1: "Check your recipe details.",
        text2: "Please complete all fields correctly.",
      });
      return;
    }

    const newRecipe = {
      recipeName: form.name,
      ingredients,
      category: form.category,
      time: Number(form.time),
      steps: form.steps,
      difficulty: form.difficulty,
      tags,
    };
    console.log("SENDING NEW RECIPE: " + newRecipe);

    const formData = new FormData();
    formData.append("recipe", JSON.stringify(newRecipe));

    if (form.photo) {
      formData.append("photo", {
        uri: form.photo.uri,
        name: form.photo.name,
        type: form.photo.type,
      });
    }

    const isSuccess = await createRecipeRequest(formData);

    if (isSuccess) {
      navigation.goBack();
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Recipe created!",
          text2: "Your recipe was saved correctly.",
        });
      }, 400);
    } else {
      Toast.show({
        type: "error",
        text1: "Recipe creation failed.",
        text2: "Please try again later.",
      });
    }

    Keyboard.dismiss();
  };

  const createRecipeRequest = async (formData) => {
    console.log("SENDING PETITION CREATERECIPEREQUEST");

    const response = await postDataToken(route + "/recipes/createRecipe", formData, token);

    if (!response) {
      console.log("NO RESPONSE");
      return false;
    }

    const [status] = response;
    console.log("STATUS:", status);

    return status === 200 || status === 201;
  };

  const isFormComplete = Object.values(form).every((value) => value) && ingredients.every((value) => value) && tags.every((value) => value);

  const validateForm = () => {
    const newErrors = {
      name: isRequired(form.name),
      category: isRequired(form.category),
      steps: isRequired(form.steps),
      time: isRequired(form.time),
      difficulty: isRequired(form.difficulty),
      ingredients: isRequiredArray(ingredients),
      tags: isRequiredArray(tags),
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.category && !newErrors.steps && !newErrors.time && !newErrors.difficulty && !newErrors.ingredients && !newErrors.tags;
  };

  return (
    <View style={styles.backdrop}>
      <View style={styles.container}>
        <TitleModalScreen title={"New Recipe"} onPress={() => navigation.goBack()} />

        <KeyboardAwareScrollView
          style={styles.scrollContainer}
          nestedScrollEnabled={true} //perimte Scroll dentro de Scroll
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={60}
          enableOnAndroid={true}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <PhotoPicker photo={form.photo?.uri} choosePhoto={choosePhoto} />

          <ItemInput
            label="Name:"
            placeholder="Ex: Roast beef"
            value={form.name}
            onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
            keyboardType="default"
            error={errors.name}
          />

          <AutocompleteList
            label="Ingredients:"
            values={ingredients}
            setValues={setIngredients}
            options={ingredientsList}
            placeholder="Ex: Pasta"
            error={errors.ingredients}
          />

          <AutocompleteInput
            label="Category:"
            placeholder="Ex: Breakfast"
            value={form.category}
            options={["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Brunch"]}
            onSelect={(text) => setForm((prev) => ({ ...prev, category: text }))}
            error={errors.category}
          />

          <ItemInput
            label="Steps to make:"
            placeholder="Step 1: ..."
            value={form.steps}
            onChangeText={(text) => setForm((prev) => ({ ...prev, steps: text }))}
            keyboardType="default"
            multiline
            numberOfLines={6}
            error={errors.steps}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View style={{ width: "45%" }}>
              <ItemInput
                label="Time:"
                placeholder="Ex: 20 min"
                value={form.time}
                onChangeText={(text) => setForm((prev) => ({ ...prev, time: text }))}
                keyboardType="numeric"
                error={errors.time}
              />
            </View>

            <View style={{ width: "45%" }}>
              <AutocompleteInput
                label="Difficulty:"
                placeholder="Ex: Low "
                value={form.difficulty}
                options={["Low", "Medium", "Hard"]}
                onSelect={(text) => setForm((prev) => ({ ...prev, difficulty: text }))}
                error={errors.difficulty}
              />
            </View>
          </View>

          <AutocompleteList label="Tags" values={tags} setValues={setTags} options={tagsList} placeholder="Ex: Pasta" error={errors.tags} />
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
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 0,
    paddingBottom: Platform.OS === "ios" ? 50 : 20,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    maxHeight: height * 0.87,
    width: "100%",
    alignSelf: "center",
    paddingBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    marginVertical: 15,
    paddingBottom: 50,
  },
});

export default AddRecipe;
