package com.listochef.model;

import java.util.List;

import java.time.Instant;

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

	public Recipe() {
	}

	public Recipe(String id, String recipeName, List<String> ingredients, String steps, String category,
			int time, String difficulty, String photo, Instant creationDate, List<String> tags) {
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRecipeName() {
		return recipeName;
	}

	public void setRecipeName(String name) {
		this.recipeName = name;
	}

	public List<String> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<String> ingredients) {
		this.ingredients = ingredients;
	}

	public String getSteps() {
		return steps;
	}

	public void setSteps(String steps) {
		this.steps = steps;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public String getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public Instant getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Instant creationDate) {
		this.creationDate = creationDate;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public boolean isSaved() {
	    return saved;
	}

	public void setSaved(boolean saved) {
	    this.saved = saved;
	}
	
}
