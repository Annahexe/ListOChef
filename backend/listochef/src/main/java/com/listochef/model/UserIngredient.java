package com.listochef.model;

/**
 * Model that represents an ingredient owned or used by a user.
 *
 * This class is used in user-specific lists such as pantry and grocery list,
 * storing the ingredient name, its category/tag, and the available quantity.
 */
public class UserIngredient {

	private String ingredientName;
	private String ingredientTag;
	private int ingredientAmount;

	/**
	 * Empty constructor of the UserIngredient class.
	 */
	public UserIngredient() {
	}

	/**
	 * Parameterized constructor of the UserIngredient class.
	 *
	 * @param ingredientName   Name of the ingredient.
	 * @param ingredientTag    Tag or category of the ingredient.
	 * @param ingredientAmount Quantity of the ingredient.
	 */
	public UserIngredient(String ingredientName, String ingredientTag, int ingredientAmount) {
		this.ingredientName = ingredientName;
		this.ingredientTag = ingredientTag;
		this.ingredientAmount = ingredientAmount;
	}

	/**
	 * Gets the ingredient name.
	 *
	 * @return Ingredient name.
	 */
	public String getIngredientName() {
		return ingredientName;
	}

	/**
	 * Sets the ingredient name.
	 *
	 * @param ingredientName New ingredient name.
	 */
	public void setIngredientName(String ingredientName) {
		this.ingredientName = ingredientName;
	}

	/**
	 * Gets the ingredient tag.
	 *
	 * @return Ingredient tag.
	 */
	public String getIngredientTag() {
		return ingredientTag;
	}

	/**
	 * Sets the ingredient tag.
	 *
	 * @param ingredientTag New ingredient tag.
	 */
	public void setIngredientTag(String ingredientTag) {
		this.ingredientTag = ingredientTag;
	}

	/**
	 * Gets the ingredient amount.
	 *
	 * @return Ingredient quantity.
	 */
	public int getIngredientAmount() {
		return ingredientAmount;
	}

	/**
	 * Sets the ingredient amount.
	 *
	 * @param ingredientAmount New quantity value.
	 */
	public void setIngredientAmount(int ingredientAmount) {
		this.ingredientAmount = ingredientAmount;
	}
}