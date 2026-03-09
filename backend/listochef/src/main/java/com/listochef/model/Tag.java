package com.listochef.model;

public class Tag {

	private String id;
	private String tag;

	public Tag() {
	}

	public Tag(String id, String tag) {
		super();
		this.id = id;
		this.tag = tag;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTag() {
		return tag;
	}

	public void setTag(String tag) {
		this.tag = tag;
	}

}
