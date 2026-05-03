import { StyleSheet, View, ImageBackground, FlatList, Text } from "react-native";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

import { Seeker } from "../../components/Seeker";
import { TagsCarousel } from "../../components/TagsCarousel";
import { ListItem } from "../../components/ListItem";
import { buildIngredientsDiff } from "../../utils/buildIngredientsDiff";
import { getData } from "../../services/services";

import Context from "../../context/Context";

import Feather from "@expo/vector-icons/Feather";

const AddProduct = (props) => {
  const { route, token } = useContext(Context);

  const { ingredientTags } = useContext(Context);
  const [selectedTags, setSelectedTags] = useState(["All"]);

  const [ingredientsList, setIngredientsList] = useState([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const { selectedIngredients, setSelectedIngredients } = useContext(Context);

  const [filteredIngredientsList, setFilteredIngredientsList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const initialSelectedRef = useRef([]);
  const latestSelectedRef = useRef(selectedIngredients);

  useEffect(() => {
    latestSelectedRef.current = selectedIngredients;
  }, [selectedIngredients]);

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

      if (!Array.isArray(ingredients)) {
        Toast.show({
          type: "error",
          text1: "Error loading ingredients!",
          text2: "Invalid response.",
        });

        return;
      }

      setIngredientsList(ingredients);
    };

    loadIngredients();
  }, [route, token]);

  const syncSelectedIngredients = useCallback(async (changes) => {
    if (changes.addedOrUpdated.length === 0 && changes.removed.length === 0) {
      return;
    }
    console.log("Sending addProductPetition", changes);

    // const response = await addProductPetition(changes);   //body: JSON.stringify(changes),
  }, []);

  useFocusEffect(
    useCallback(() => {
      // snapshot when entering / focusing the screen
      initialSelectedRef.current = [...latestSelectedRef.current];

      return () => {
        // compare when leaving the screen
        const changes = buildIngredientsDiff(initialSelectedRef.current, latestSelectedRef.current);

        syncSelectedIngredients(changes);
      };
    }, [syncSelectedIngredients]),
  );

  const toggleTag = (selectedTag) => {
    setSelectedTags((previousSelectedTags) => {
      if (selectedTag == "All") {
        return ["All"];
      }
      const tagsWithoutAll = previousSelectedTags.filter((element) => element !== "All");
      if (tagsWithoutAll.includes(selectedTag)) {
        const selectedTagsList = tagsWithoutAll.filter((element) => element !== selectedTag);
        return selectedTagsList.length === 0 ? ["All"] : selectedTagsList;
      }
      return [...tagsWithoutAll, selectedTag];
    });
  };

  const selectIngredient = (ingredientName) => {
    setSelectedIngredients((prev) => {
      const alreadyExists = prev.find((item) => item.name === ingredientName);

      if (alreadyExists) return prev;

      return [...prev, { name: ingredientName, amount: 1 }];
    });
  };

  const unselectIngredient = (ingredientName) => {
    setSelectedIngredients((prev) => prev.filter((item) => item.name !== ingredientName));
  };

  const addAmount = (ingredientName) => {
    setSelectedIngredients((prev) => prev.map((item) => (item.name === ingredientName ? { ...item, amount: item.amount + 1 } : item)));
  };

  const subtractAmount = (ingredientName) => {
    setSelectedIngredients((prev) =>
      prev.map((item) => (item.name === ingredientName ? { ...item, amount: item.amount - 1 } : item)).filter((item) => item.amount > 0),
    );
  };

  const isIngredientSelected = (ingredientName) => {
    return selectedIngredients.some((item) => item.name === ingredientName);
  };

  const getIngredientAmount = (ingredientName) => {
    const ingredient = selectedIngredients.find((item) => item.name === ingredientName);
    return ingredient ? ingredient.amount : 0;
  };

  //demo data
  // useEffect(() => {
  //   //const ingredientsData = await getIngredients();
  //   const ingredientsData = [
  //     { ingredientName: "Whole Milk", ingredientTag: "dairy" },
  //     { ingredientName: "Eggs", ingredientTag: "protein" },
  //     { ingredientName: "Wheat Bread", ingredientTag: "bakery" },
  //     { ingredientName: "Pasta", ingredientTag: "grain" },
  //     { ingredientName: "Tomatoes", ingredientTag: "vegetables" },
  //     { ingredientName: "Cereals", ingredientTag: "grain" },
  //     { ingredientName: "Mayonnaise", ingredientTag: "sauce" },
  //     { ingredientName: "Maple syrup", ingredientTag: "sweet" },
  //     { ingredientName: "Macaroni", ingredientTag: "Grains & Starches" },
  //     { ingredientName: "Mango", ingredientTag: "fruit" },
  //     { ingredientName: "Marshmallow", ingredientTag: "sweet" },
  //     { ingredientName: "Macadamia", ingredientTag: "nuts" },
  //     { ingredientName: "Manchego", ingredientTag: "dairy" },
  //     { ingredientName: "Margarine", ingredientTag: "dairy" },
  //     { ingredientName: "Mascarpone", ingredientTag: "dairy" },
  //     { ingredientName: "Mackerel", ingredientTag: "fish" },
  //     { ingredientName: "Macaroons", ingredientTag: "dessert" },
  //     { ingredientName: "Mandarin", ingredientTag: "fruits" },
  //   ];

  //   setIngredientsList(ingredientsData);
  //   setFilteredIngredientsList(ingredientsData);
  // }, []);

  //SEARCH USE EFFECT
  useEffect(() => {
    let result = [...ingredientsList];

    const normalizedSearch = searchText.trim().toLowerCase();

    // Filter by text
    if (normalizedSearch !== "") {
      result = result.filter((ingredient) => {
        return ingredient.ingredientName.toLowerCase().includes(normalizedSearch);
      });
    }

    // Filter by tags
    if (!selectedTags.includes("All")) {
      result = result.filter((ingredient) => selectedTags.map((tag) => tag.toLowerCase()).includes(ingredient.ingredientTag.toLowerCase()));
    }

    setFilteredIngredientsList(result);
  }, [searchText, selectedTags, ingredientsList]);

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <Feather name="chevron-left" size={60} color="rgba(75, 100, 63, 0.7)" onPress={() => props.navigation.goBack()} />
            <Seeker placeholderText="Search new products..." value={searchText} onChangeText={setSearchText}></Seeker>
          </View>
          <TagsCarousel tagsList={ingredientTags} selectedTags={selectedTags} onToggleTag={toggleTag} />
          <FlatList
            data={filteredIngredientsList}
            keyExtractor={(item) => item.ingredientName}
            style={{ width: "100%", marginBottom: "12%" }}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <ListItem
                ingredient={item.ingredientName}
                isSelected={isIngredientSelected(item.ingredientName)}
                amount={getIngredientAmount(item.ingredientName)}
                onSelect={() => selectIngredient(item.ingredientName)}
                onUnselect={() => unselectIngredient(item.ingredientName)}
                onAddAmount={() => addAmount(item.ingredientName)}
                onSubtractAmount={() => subtractAmount(item.ingredientName)}
              />
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No ingredients found :c</Text>}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 235, 0.7)",
  },
  container: {
    padding: 5,
    marginTop: 45,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 30,
    color: "#4B643F",
    fontFamily: "MontserratSemiBold",
  },
});
export default AddProduct;
