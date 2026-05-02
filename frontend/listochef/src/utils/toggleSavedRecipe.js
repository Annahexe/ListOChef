import Toast from "react-native-toast-message";
import { postDataToken } from "../services/services";

export const TOGGLE_SAVED_STATUS = {
  SAVED: "SAVED",
  REMOVED: "REMOVED",
  ERROR: "ERROR",
};

export const toggleSavedPetition = async ({ route, token, recipeId }) => {
  const response = await postDataToken(
    route + "/toggleSaved",
    { recipeId },
    token,
  );

  if (!response) return TOGGLE_SAVED_STATUS.ERROR;

  const [status, jsonResponse] = response;

  if (status === 200) {
    if (jsonResponse === "saved:true") return TOGGLE_SAVED_STATUS.SAVED;
    if (jsonResponse === "saved:false") return TOGGLE_SAVED_STATUS.REMOVED;
  }

  return TOGGLE_SAVED_STATUS.ERROR;
};

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