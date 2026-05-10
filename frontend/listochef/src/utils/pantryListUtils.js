/**
 * Builds an updated pantry list by merging new items into the current pantry.
 * If an ingredient already exists, its amount is increased.
 * If it does not exist, it is added as a new pantry item.
 * Items without a valid name or with an amount of 0 or less are removed.
 *
 * @param {Array} currentPantryItems - Current pantry items.
 * @param {Array} newItems - New items to add or merge into the pantry.
 * @returns {Array} Updated pantry list.
 */
export const buildUpdatedPantryList = (currentPantryItems = [], newItems = []) => {
  const updatedPantryItems = [...currentPantryItems];

  newItems.forEach((newItem) => {
    const existingIndex = updatedPantryItems.findIndex((item) => item.ingredientName === newItem.ingredientName);

    if (existingIndex !== -1) {
      updatedPantryItems[existingIndex] = {
        ...updatedPantryItems[existingIndex],
        ingredientAmount: updatedPantryItems[existingIndex].ingredientAmount + newItem.ingredientAmount,
      };
    } else {
      updatedPantryItems.push({
        ingredientName: newItem.ingredientName,
        ingredientTag: newItem.ingredientTag,
        ingredientAmount: newItem.ingredientAmount,
      });
    }
  });

  return updatedPantryItems.filter((item) => item.ingredientName && item.ingredientAmount > 0);
};

// services/pantryServices.js

import Toast from "react-native-toast-message";
import { postDataToken } from "../services/services";

/**
 * Sends the pantry list to the backend to update the user's saved pantry.
 * Shows an error toast if the request fails.
 *
 * @param {Object} params - Request parameters.
 * @param {string} params.route - Backend base route.
 * @param {string} params.token - User authentication token.
 * @param {Array} params.pantryItems - Updated pantry items to store.
 * @returns {Promise<boolean>} True if the pantry was updated, false otherwise.
 */
export const updatePantryListPetition = async ({ route, token, pantryItems }) => {
  try {
    const response = await postDataToken(route + "/updatePantryList", pantryItems, token);

    if (!response) {
      Toast.show({
        type: "error",
        text1: "Error updating pantry!",
        text2: "Please try again later.",
      });

      return false;
    }

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
