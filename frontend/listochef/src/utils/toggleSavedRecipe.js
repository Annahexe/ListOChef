import Toast from "react-native-toast-message";
import { postDataToken } from "../services/services";

/**
 * Possible results returned by the toggle saved request.
 */
export const TOGGLE_SAVED_STATUS = {
  SAVED: "SAVED",
  REMOVED: "REMOVED",
  ERROR: "ERROR",
};

/**
 * Sends a request to toggle the saved state of a recipe.
 * The backend returns whether the recipe was saved or removed.
 *
 * @param {Object} params - Request parameters.
 * @param {string} params.route - Backend base route.
 * @param {string} params.token - User authentication token.
 * @param {string|number} params.recipeId - Recipe id to toggle.
 * @returns {Promise<string>} Toggle result: SAVED, REMOVED or ERROR.
 */
export const toggleSavedPetition = async ({ route, token, recipeId }) => {
  const response = await postDataToken(route + "/toggleSaved", { recipeId }, token);

  if (!response) return TOGGLE_SAVED_STATUS.ERROR;

  const [status, jsonResponse] = response;

  if (status === 200) {
    if (jsonResponse === "saved:true") return TOGGLE_SAVED_STATUS.SAVED;
    if (jsonResponse === "saved:false") return TOGGLE_SAVED_STATUS.REMOVED;
  }

  return TOGGLE_SAVED_STATUS.ERROR;
};

/**
 * Shows a toast message depending on the toggle saved result.
 *
 * @param {string} result - Result returned by toggleSavedPetition.
 */
export const showToggleSavedToast = (result) => {
  if (result === TOGGLE_SAVED_STATUS.SAVED) {
    Toast.show({
      type: "success",
      text1: "❤️ Successfully saved recipe.",
    });
    return;
  }

  if (result === TOGGLE_SAVED_STATUS.REMOVED) {
    Toast.show({
      type: "error",
      text1: "💔 Removed from saved recipes.",
    });
    return;
  }

  Toast.show({
    type: "error",
    text1: "⚠️ Could not update saved recipe.",
  });
};
