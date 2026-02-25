package com.listochef.model;

import java.util.List;

import org.bson.types.ObjectId;

public class User {

	private ObjectId _id;
	private String nickname;
	private String email;
	private String password;
	private String avatar;
	private List<String> recipesSaved;

	public User() {
	}

	public User(ObjectId _id, String nickname, String email, String password, String avatar,
			List<String> recipesSaved) {
		super();
		this._id = _id;
		this.nickname = nickname;
		this.email = email;
		this.password = password;
		this.avatar = avatar;
		this.recipesSaved = recipesSaved;
	}

	public ObjectId get_id() {
		return _id;
	}

	public void set_id(ObjectId _id) {
		this._id = _id;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public List<String> getRecipesSaved() {
		return recipesSaved;
	}

	public void setRecipesSaved(List<String> recipesSaved) {
		this.recipesSaved = recipesSaved;
	}

}
