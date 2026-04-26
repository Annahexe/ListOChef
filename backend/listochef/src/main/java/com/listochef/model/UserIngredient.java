package com.listochef.model;

public class UserIngredient {

	private String ingredientName;
	private String ingredientTag;
	private int ingredientAmount;

	public UserIngredient() {
	}

	public UserIngredient(String ingredientName, String ingredientTag, int ingredientAmount) {
		this.ingredientName = ingredientName;
		this.ingredientTag = ingredientTag;
		this.ingredientAmount = ingredientAmount;
	}

	public String getIngredientName() {
		return ingredientName;
	}

	public void setIngredientName(String ingredientName) {
		this.ingredientName = ingredientName;
	}

	public String getIngredientTag() {
		return ingredientTag;
	}

	public void setIngredientTag(String ingredientTag) {
		this.ingredientTag = ingredientTag;
	}

	public int getIngredientAmount() {
		return ingredientAmount;
	}

	public void setIngredientAmount(int ingredientAmount) {
		this.ingredientAmount = ingredientAmount;
	}
}