package com.listochef.model;

import org.bson.types.ObjectId;

public class Ingredient {

	private ObjectId _id;
	private String name;
	private String category;

	public Ingredient() {
	}

	public Ingredient(ObjectId _id, String name, String category) {
		super();
		this._id = _id;
		this.name = name;
		this.category = category;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

}
