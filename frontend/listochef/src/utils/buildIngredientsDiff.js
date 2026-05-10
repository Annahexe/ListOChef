/**
 * Builds a list of changes between the initial grocery list and the current one.
 * Used to sync only modified ingredients with the backend.
 *
 * The returned changes include:
 * - Added ingredients.
 * - Ingredients whose amount was updated.
 * - Removed ingredients, sent with amount 0.
 *
 * @param {Array} initialList - Grocery list snapshot when entering the screen.
 * @param {Array} currentList - Current grocery list when leaving the screen.
 * @returns {Array} List of ingredient changes to send to the backend.
 */
export const buildIngredientsDiff = (initialList = [], currentList = []) => {
  const changes = [];

  // Added or updated
  currentList.forEach((currentItem) => {
    const initialItem = initialList.find((item) => item.ingredientName === currentItem.ingredientName);

    if (!initialItem) {
      changes.push({
        ingredientName: currentItem.ingredientName,
        ingredientTag: currentItem.ingredientTag,
        ingredientAmount: currentItem.ingredientAmount,
      });

      return;
    }

    if (initialItem.ingredientAmount !== currentItem.ingredientAmount) {
      changes.push({
        ingredientName: currentItem.ingredientName,
        ingredientTag: currentItem.ingredientTag,
        ingredientAmount: currentItem.ingredientAmount,
      });
    }
  });

  // Removed
  initialList.forEach((initialItem) => {
    const stillExists = currentList.some((item) => item.ingredientName === initialItem.ingredientName);

    if (!stillExists) {
      changes.push({
        ingredientName: initialItem.ingredientName,
        ingredientTag: initialItem.ingredientTag,
        ingredientAmount: 0,
      });
    }
  });

  return changes;
};
