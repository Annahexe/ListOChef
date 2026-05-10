package com.listochef.model;

/**
 * Model that represents an ingredient in the system.
 *
 * This class stores the basic information of an ingredient, including its
 * identifier, name, and tag/category.
 */
public class Ingredient {

	private String id;
	private String ingredientName;
	private String ingredientTag;

	/**
	 * Empty constructor of the Ingredient class.
	 */
	public Ingredient() {
	}

	/**
	 * Parameterized constructor of the Ingredient class.
	 *
	 * @param id             Unique identifier of the ingredient.
	 * @param ingredientName Name of the ingredient.
	 * @param ingredientTag  Tag or category associated with the ingredient.
	 */
	public Ingredient(String id, String ingredientName, String ingredientTag) {
		super();
		this.id = id;
		this.ingredientName = ingredientName;
		this.ingredientTag = ingredientTag;
	}

	/**
	 * Gets the ingredient ID.
	 *
	 * @return Ingredient ID.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Sets the ingredient ID.
	 *
	 * @param id New ingredient ID.
	 */
	public void setId(String id) {
		this.id = id;
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
}