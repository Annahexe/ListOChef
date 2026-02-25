package com.listochef.model;

import java.util.List;

import org.bson.types.ObjectId;

import java.time.Instant;

public class Recipe {

	private ObjectId _id;
	private String user;
	private String name;
	private List<String> ingredients;
	private String steps;
	private String category;
	private int time;
	private String difficulty;
	private String photo;
	private Instant creationDate;
	private List<String> tags;

	public Recipe() {
	}

	public Recipe(ObjectId _id, String user, String name, List<String> ingredients, String steps, String category,
			int time, String difficulty, String photo, Instant creationDate, List<String> tags) {
		super();
		this._id = _id;
		this.user = user;
		this.name = name;
		this.ingredients = ingredients;
		this.steps = steps;
		this.category = category;
		this.time = time;
		this.difficulty = difficulty;
		this.photo = photo;
		this.creationDate = creationDate;
		this.tags = tags;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

}
