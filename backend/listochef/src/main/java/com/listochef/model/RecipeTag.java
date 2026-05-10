package com.listochef.model;

import org.bson.types.ObjectId;

/**
 * Model that represents a recipe tag in the system.
 *
 * Tags are used to classify recipes using keywords such as "vegan", "quick",
 * "gluten-free", etc.
 */
public class RecipeTag {

	private String id;
	private String name;

	/**
	 * Empty constructor of the RecipeTag class.
	 */
	public RecipeTag() {
	}

	/**
	 * Parameterized constructor of the RecipeTag class.
	 *
	 * @param id   Unique identifier of the tag.
	 * @param name Name of the tag.
	 */
	public RecipeTag(String id, String name) {
		this.id = id;
		this.name = name;
	}

	/**
	 * Gets the tag ID.
	 *
	 * @return Tag ID.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Sets the tag ID.
	 *
	 * @param id New tag ID.
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Gets the tag name.
	 *
	 * @return Tag name.
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets the tag name.
	 *
	 * @param name New tag name.
	 */
	public void setName(String name) {
		this.name = name;
	}

}