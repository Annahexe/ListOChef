package com.listochef.model;

import org.bson.types.ObjectId;

public class IngredientCategory {

	private ObjectId _id;
	private String name;
	private String icon;

	public IngredientCategory() {
	}

	public IngredientCategory(ObjectId _id, String name, String icon) {
		super();
		this._id = _id;
		this.name = name;
		this.icon = icon;
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

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

}
