package com.listochef.model;

import java.util.List;

import org.bson.types.ObjectId;

public class User {

	//establecer bien esta wea
	private String id;
	private String name;
	private String surname;
	private String email;
	private String password;
	private String avatar;
	private List<String> recipesSaved;
	private List<String> myGroceryList;

	public User() {
	}

	public User(String id, String name, String surname, String email, String password, String avatar,
			List<String> recipesSaved, List<String> myGroceryList) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.avatar = avatar;
		this.recipesSaved = recipesSaved;
		this.setMyGroceryList(myGroceryList);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getSurname() {
		return surname;
	}
	
	public void setSurname(String surname) {
		this.surname = surname;
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

	public List<String> getMyGroceryList() {
		return myGroceryList;
	}

	public void setMyGroceryList(List<String> myGroceryList) {
		this.myGroceryList = myGroceryList;
	}

}
