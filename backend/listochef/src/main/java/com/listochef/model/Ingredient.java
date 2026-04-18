package com.listochef.model;

public class Ingredient {

	private String id;
	private String ingredientName;
	private String ingredientTag;

	public Ingredient() {
	}

	public Ingredient(String id, String ingredientName, String ingredientTag) {
		super();
		this.id = id;
		this.ingredientName = ingredientName;
		this.ingredientTag = ingredientTag;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIngredientName() {
		return ingredientName;
	}

	public void setIngredientName(String name) {
		this.ingredientName = name;
	}

	public String getIngredientTag() {
		return ingredientTag;
	}

	public void setIngredientTag(String category) {
		this.ingredientTag = category;
	}

}
