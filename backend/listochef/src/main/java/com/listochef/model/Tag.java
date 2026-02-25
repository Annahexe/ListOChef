package com.listochef.model;

import org.bson.types.ObjectId;

public class Tag {

	private ObjectId _id;
	private String tag;

	public Tag() {
	}

	public Tag(ObjectId _id, String tag) {
		super();
		this._id = _id;
		this.tag = tag;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

}
