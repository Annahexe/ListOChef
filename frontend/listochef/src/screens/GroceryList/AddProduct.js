import { StyleSheet, View, ImageBackground, ScrollView, Text } from "react-native";
import { useEffect, useState, useContext } from "react";

import { Seeker } from "../../components/Seeker";
import { TagsCarousel } from "../../components/TagsCarousel";
import { ListItem } from "../../components/ListItem";

import Context from "../../context/Context";

import Feather from "@expo/vector-icons/Feather";

const AddProduct = (props) => {
  const { ingredientTags, setIngredientTags } = useContext(Context);
  const [selectedTags, setSelectedTags] = useState(["All"]);

  const [ingredientsList, setIngredientsList] = useState([]);
  const { selectedIngredients, setSelectedIngredients } = useContext(Context);

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
  useEffect(() => {
    setIngredientsList([
      "Whole Milk",
      "Eggs",
      "Wheat Bread",
      "Pasta",
      "Tomatoes",
      "Cereals",
      "Mayonnaise",
      "Maple syrup",
      "Macaroni",
      "Mango",
      "Marshmallow",
      "Macadamia",
      "Manchego",
      "Margarine",
      "Mascarpone",
      "Mackerel",
      "Macaroons",
      "Mandarin",
    ]);
  }, []);

  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.searchBarContainer}>
            <Feather name="chevron-left" size={60} color="rgba(75, 100, 63, 0.7)" onPress={() => props.navigation.goBack()} />
            <Seeker placeholderText="Search new products..." onPress={() => console.log("searching")}></Seeker>
          </View>
          <TagsCarousel tagsList={ingredientTags} selectedTags={selectedTags} onToggleTag={toggleTag} />
          <ScrollView style={{ width: "100%", marginBottom: "12%" }} contentContainerStyle={{ paddingBottom: 20 }}>
            {ingredientsList.map((ingredient) => (
              <ListItem
                key={ingredient}
                ingredient={ingredient}
                isSelected={isIngredientSelected(ingredient)}
                amount={getIngredientAmount(ingredient)}
                onSelect={() => selectIngredient(ingredient)}
                onUnselect={() => unselectIngredient(ingredient)}
                onAddAmount={() => addAmount(ingredient)}
                onSubtractAmount={() => subtractAmount(ingredient)}
              />
            ))}
          </ScrollView>
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
});
export default AddProduct;
