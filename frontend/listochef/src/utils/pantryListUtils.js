export const buildUpdatedPantryList = (currentPantryItems = [], newItems = []) => {
  const updatedPantryItems = [...currentPantryItems];

  newItems.forEach((newItem) => {
    const existingIndex = updatedPantryItems.findIndex(
      (item) => item.ingredientName === newItem.ingredientName,
    );

    if (existingIndex !== -1) {
      updatedPantryItems[existingIndex] = {
        ...updatedPantryItems[existingIndex],
        ingredientAmount:
          updatedPantryItems[existingIndex].ingredientAmount +
          newItem.ingredientAmount,
      };
    } else {
      updatedPantryItems.push({
        ingredientName: newItem.ingredientName,
        ingredientTag: newItem.ingredientTag,
        ingredientAmount: newItem.ingredientAmount,
      });
    }
  });

  return updatedPantryItems.filter(
    (item) => item.ingredientName && item.ingredientAmount > 0,
  );
};

// services/pantryServices.js

import Toast from "react-native-toast-message";
import { postDataToken } from "../services/services";

export const updatePantryListPetition = async ({
  route,
  token,
  pantryItems,
}) => {
  try {
    const response = await postDataToken(
      route + "/updatePantryList",
      pantryItems,
      token,
    );

    if (!response) {
      Toast.show({
        type: "error",
        text1: "Error updating pantry!",
        text2: "Please try again later.",
      });

      return false;
    }

    console.log("Pantry updated:", response);
    return true;
  } catch (error) {
    console.error("Error updating pantry:", error);

    Toast.show({
      type: "error",
      text1: "Error updating pantry!",
      text2: "Please try again later.",
    });

    return false;
  }
};