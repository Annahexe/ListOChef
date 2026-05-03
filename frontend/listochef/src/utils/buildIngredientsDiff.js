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
