import {
  View,
  StyleSheet,
  Keyboard,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { useState, useContext, useEffect } from "react";
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
import { getData, postDataToken } from "../../services/services";

const { height, width } = Dimensions.get("window");

/**
 * AddRecipe modal screen for creating a new recipe.
 * Includes fields for photo, name, ingredients, category, steps,
 * time, difficulty and tags. Validates the form before sending to backend.
 *
 * @param {Object} navigation - Navigation prop for going back after saving.
 * @returns {JSX.Element} Add Recipe modal screen.
 */
const AddRecipe = ({ navigation }) => {
  const {
    token,
    route,
    ingredientTags,
    listRecipesTags,
    listRecipesCategories,
  } = useContext(Context);

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

  // Available options for autocomplete fields
  const [ingredientsList, setIngredientsList] = useState([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [tagsList, setTagsList] = useState(
    listRecipesTags.map((tag) => tag.name),
  );
  const [categoryList, setCategoryList] = useState(
    listRecipesCategories.map((tag) => tag.name),
  );

  // Dynamic lists for ingredients and tags added by the user
  const [ingredients, setIngredients] = useState([""]);
  const [tags, setTags] = useState([""]);

  // Checks if the recipe petition is loading to show a loading state.
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadIngredients = async () => {
      setIsLoadingIngredients(true);

      const ingredients = await getData(route + "/ingredients", token);

      setIsLoadingIngredients(false);

      if (!ingredients) {
        Toast.show({
          type: "error",
          text1: "Error loading ingredients!",
          text2: "Please try again later.",
        });

        return;
      }

      setIngredientsList(
        ingredients.map((ingredient) => ingredient.ingredientName),
      );
    };

    loadIngredients();
  }, [route, token]);

  /** Opens the image picker and stores the selected photo in form state. */
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

  /**
   * Validates the form and sends the new recipe to the backend.
   * Shows a success toast and navigates back on success.
   */
  const onSaved = async () => {
    const isValid = validateForm();

    if (!isValid) {
      Toast.show({
        type: "error",
        text1: "Check your recipe details.",
        text2: "Please complete all fields correctly.",
      });
      return;
    }

    setIsLoading(true);

    const newRecipe = {
      recipeName: form.name,
      ingredients,
      category: form.category,
      time: Number(form.time),
      steps: form.steps,
      difficulty: form.difficulty,
      tags,
    };

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

    setIsLoading(false);
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

  /**
   * Sends a POST request to create the recipe in the backend.
   * @param {FormData} formData - Recipe data including optional photo.
   * @returns {Promise<boolean>} True if status is 200 or 201, false otherwise.
   */
  const createRecipeRequest = async (formData) => {
    const response = await postDataToken(
      route + "/recipes/createRecipe",
      formData,
      token,
    );

    if (!response) {
      console.log("NO RESPONSE");
      return false;
    }

    const [status] = response;

    return status === 200 || status === 201;
  };

  /** True when all form fields and dynamic lists are filled. */
  const isFormComplete =
    Object.values(form).every((value) => value) &&
    ingredients.every((value) => value) &&
    tags.every((value) => value);

  /** Validates all form fields and updates error state. @returns {boolean} */
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
    return (
      !newErrors.name &&
      !newErrors.category &&
      !newErrors.steps &&
      !newErrors.time &&
      !newErrors.difficulty &&
      !newErrors.ingredients &&
      !newErrors.tags
    );
  };

  return (
    <>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <TitleModalScreen
            title={"New Recipe"}
            onPress={() => navigation.goBack()}
          />

          <ScrollView
            style={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <PhotoPicker photo={form.photo?.uri} choosePhoto={choosePhoto} />

            <ItemInput
              label="Name:"
              placeholder="Ex: Roast beef"
              value={form.name}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, name: text }))
              }
              keyboardType="default"
              error={errors.name}
            />

            <AutocompleteList
              label="Ingredients:"
              values={ingredients}
              setValues={setIngredients}
              options={ingredientsList}
              placeholder={
                isLoadingIngredients ? "Loading ingredients..." : "Ex: Tomato"
              }
              error={errors.ingredients}
            />

            <AutocompleteInput
              label="Category:"
              placeholder="Ex: Breakfast"
              value={form.category}
              options={categoryList}
              onSelect={(text) =>
                setForm((prev) => ({ ...prev, category: text }))
              }
              error={errors.category}
            />

            <ItemInput
              label="Steps to make:"
              placeholder="Step 1: ..."
              value={form.steps}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, steps: text }))
              }
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
                  onChangeText={(text) =>
                    setForm((prev) => ({ ...prev, time: text }))
                  }
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
                  onSelect={(text) =>
                    setForm((prev) => ({ ...prev, difficulty: text }))
                  }
                  error={errors.difficulty}
                />
              </View>
            </View>

            <AutocompleteList
              label="Tags"
              values={tags}
              setValues={setTags}
              options={tagsList}
              placeholder="Ex: Pasta"
              error={errors.tags}
            />
          </ScrollView>

          <ModalButtons
            onCancel={() => navigation.goBack()}
            onSave={onSaved}
            isFormComplete={isFormComplete}
            isLoading={isLoading}
          />
        </View>
      </View>
    </>
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
