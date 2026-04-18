package com.listochef.model;

public class IngredientCategory {

	private String id;
	private String ingredientCategoryName;
	private String icon;

	public IngredientCategory() {
	}

	public IngredientCategory(String id, String ingredientCategoryName, String icon) {
		super();
		this.id = id;
		this.ingredientCategoryName = ingredientCategoryName;
		this.icon = icon;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIngredientCategoryName() {
		return ingredientCategoryName;
	}

	public void setIngredientCategoryName(String name) {
		this.ingredientCategoryName = name;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

}
