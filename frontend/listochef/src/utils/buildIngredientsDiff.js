export const buildIngredientsDiff = (initialList, currentList) => {
  const addedOrUpdated = [];
  const removed = [];

  // Added or updated
  currentList.forEach((currentItem) => {
    const initialItem = initialList.find(
      (item) => item.name === currentItem.name
    );

    if (!initialItem) {
      addedOrUpdated.push({
        name: currentItem.name,
        amount: currentItem.amount,
        type: "added",
      });
    } else if (initialItem.amount !== currentItem.amount) {
      addedOrUpdated.push({
        name: currentItem.name,
        amount: currentItem.amount,
        previousAmount: initialItem.amount,
        type: "updated",
      });
    }
  });

  // Removed
  initialList.forEach((initialItem) => {
    const stillExists = currentList.some(
      (item) => item.name === initialItem.name
    );

    if (!stillExists) {
      removed.push({
        name: initialItem.name,
        type: "removed",
      });
    }
  });

  return { addedOrUpdated, removed };
};