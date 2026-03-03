package com.listochef.model;

import java.util.List;

import org.bson.types.ObjectId;

public class User {

	private String id;
	private String nickname;
	private String email;
	private String password;
	private String avatar;
	private List<String> isSaved;

	public User() {
	}

	public User(String id, String nickname, String email, String password, String avatar,
			List<String> isSaved) {
		super();
		this.id = id;
		this.nickname = nickname;
		this.email = email;
		this.password = password;
		this.avatar = avatar;
		this.isSaved = isSaved;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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
		return isSaved;
	}

	public void setRecipesSaved(List<String> isSaved) {
		this.isSaved = isSaved;
	}

}
