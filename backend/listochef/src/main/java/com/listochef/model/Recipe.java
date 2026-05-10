package com.listochef.model;

import java.util.List;

import java.time.Instant;

/**
 * Model that represents a recipe in the system.
 *
 * This class stores all information related to a recipe, including ingredients,
 * steps, metadata, and user state.
 */
public class Recipe {

	private String id;
	private String recipeName;
	private List<String> ingredients;
	private String steps;
	private String category;
	private int time;
	private String difficulty;
	private String photo;
	private Instant creationDate;
	private List<String> tags;
	private boolean saved;

	/**
	 * Empty constructor of the Recipe class.
	 */
	public Recipe() {
	}

	/**
	 * Parameterized constructor of the Recipe class.
	 *
	 * @param id           Unique identifier of the recipe.
	 * @param recipeName   Name of the recipe.
	 * @param ingredients  List of ingredients.
	 * @param steps        Preparation steps.
	 * @param category     Recipe category.
	 * @param time         Preparation time.
	 * @param difficulty   Difficulty level.
	 * @param photo        Image of the recipe.
	 * @param creationDate Creation date of the recipe.
	 * @param tags         Associated tags.
	 */
	public Recipe(String id, String recipeName, List<String> ingredients, String steps, String category, int time,
			String difficulty, String photo, Instant creationDate, List<String> tags) {
		super();
		this.id = id;
		this.recipeName = recipeName;
		this.ingredients = ingredients;
		this.steps = steps;
		this.category = category;
		this.time = time;
		this.difficulty = difficulty;
		this.photo = photo;
		this.creationDate = creationDate;
		this.tags = tags;
	}

	/**
	 * Gets the recipe ID.
	 *
	 * @return Recipe ID.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Sets the recipe ID.
	 *
	 * @param id New recipe ID.
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Gets the recipe name.
	 *
	 * @return Recipe name.
	 */
	public String getRecipeName() {
		return recipeName;
	}

	/**
	 * Sets the recipe name.
	 *
	 * @param name New recipe name.
	 */
	public void setRecipeName(String name) {
		this.recipeName = name;
	}

	/**
	 * Gets the ingredient list.
	 *
	 * @return List of ingredients.
	 */
	public List<String> getIngredients() {
		return ingredients;
	}

	/**
	 * Sets the ingredient list.
	 *
	 * @param ingredients New ingredient list.
	 */
	public void setIngredients(List<String> ingredients) {
		this.ingredients = ingredients;
	}

	/**
	 * Gets the preparation steps.
	 *
	 * @return Preparation steps.
	 */
	public String getSteps() {
		return steps;
	}

	/**
	 * Sets the preparation steps.
	 *
	 * @param steps New preparation steps.
	 */
	public void setSteps(String steps) {
		this.steps = steps;
	}

	/**
	 * Gets the recipe category.
	 *
	 * @return Recipe category.
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * Sets the recipe category.
	 *
	 * @param category New category.
	 */
	public void setCategory(String category) {
		this.category = category;
	}

	/**
	 * Gets the preparation time.
	 *
	 * @return Time in minutes.
	 */
	public int getTime() {
		return time;
	}

	/**
	 * Sets the preparation time.
	 *
	 * @param time New time value.
	 */
	public void setTime(int time) {
		this.time = time;
	}

	/**
	 * Gets the difficulty level.
	 *
	 * @return Difficulty level.
	 */
	public String getDifficulty() {
		return difficulty;
	}

	/**
	 * Sets the difficulty level.
	 *
	 * @param difficulty New difficulty level.
	 */
	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	/**
	 * Gets the recipe photo.
	 *
	 * @return Photo URL or reference.
	 */
	public String getPhoto() {
		return photo;
	}

	/**
	 * Sets the recipe photo.
	 *
	 * @param photo New photo URL.
	 */
	public void setPhoto(String photo) {
		this.photo = photo;
	}

	/**
	 * Gets the creation date of the recipe.
	 *
	 * @return Creation date.
	 */
	public Instant getCreationDate() {
		return creationDate;
	}

	/**
	 * Sets the creation date of the recipe.
	 *
	 * @param creationDate New creation date.
	 */
	public void setCreationDate(Instant creationDate) {
		this.creationDate = creationDate;
	}

	/**
	 * Gets the recipe tags.
	 *
	 * @return List of tags.
	 */
	public List<String> getTags() {
		return tags;
	}

	/**
	 * Sets the recipe tags.
	 *
	 * @param tags New tag list.
	 */
	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	/**
	 * Checks if the recipe is saved by the user.
	 *
	 * @return True if saved, false otherwise.
	 */
	public boolean isSaved() {
		return saved;
	}

	/**
	 * Sets whether the recipe is saved by the user.
	 *
	 * @param saved Saved state.
	 */
	public void setSaved(boolean saved) {
		this.saved = saved;
	}
}
