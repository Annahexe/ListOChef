package com.listochef.model;

/**
 * Model that represents an ingredient category in the system.
 *
 * This class stores information about a category, including its identifier,
 * name, and associated icon.
 */
public class IngredientCategory {

	private String id;
	private String ingredientCategoryName;
	private String icon;

	/**
	 * Empty constructor of the IngredientCategory class.
	 */
	public IngredientCategory() {
	}

	/**
	 * Parameterized constructor of the IngredientCategory class.
	 *
	 * @param id                     Unique identifier of the category.
	 * @param ingredientCategoryName Name of the ingredient category.
	 * @param icon                   Icon associated with the category.
	 */
	public IngredientCategory(String id, String ingredientCategoryName, String icon) {
		super();
		this.id = id;
		this.ingredientCategoryName = ingredientCategoryName;
		this.icon = icon;
	}

	/**
	 * Gets the category ID.
	 *
	 * @return Category ID.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Sets the category ID.
	 *
	 * @param id New category ID.
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Gets the ingredient category name.
	 *
	 * @return Category name.
	 */
	public String getIngredientCategoryName() {
		return ingredientCategoryName;
	}

	/**
	 * Sets the ingredient category name.
	 *
	 * @param name New category name.
	 */
	public void setIngredientCategoryName(String name) {
		this.ingredientCategoryName = name;
	}

	/**
	 * Gets the category icon.
	 *
	 * @return Category icon.
	 */
	public String getIcon() {
		return icon;
	}

	/**
	 * Sets the category icon.
	 *
	 * @param icon New category icon.
	 */
	public void setIcon(String icon) {
		this.icon = icon;
	}
}
