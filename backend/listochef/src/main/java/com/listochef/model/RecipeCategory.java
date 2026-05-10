package com.listochef.model;

/**
 * Model that represents a recipe category in the system.
 *
 * This class stores basic information about a recipe category, including its
 * identifier, name, and description.
 */
public class RecipeCategory {

	private String id;
	private String name;
	private String description;

	/**
	 * Empty constructor of the RecipeCategory class.
	 */
	public RecipeCategory() {
	}

	/**
	 * Parameterized constructor of the RecipeCategory class.
	 *
	 * @param id          Unique identifier of the category.
	 * @param name        Name of the category.
	 * @param description Description of the category.
	 */
	public RecipeCategory(String id, String name, String description) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
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
	 * Gets the category name.
	 *
	 * @return Category name.
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets the category name.
	 *
	 * @param name New category name.
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets the category description.
	 *
	 * @return Category description.
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets the category description.
	 *
	 * @param description New category description.
	 */
	public void setDescription(String description) {
		this.description = description;
	}

}
