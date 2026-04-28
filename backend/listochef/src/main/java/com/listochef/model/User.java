package com.listochef.model;

import java.util.List;


public class User {

	private String id;
	private String name;
	private String surname;
	private String email;
	private String password;
	private String avatar;
	private List<String> recipesSavedIds;
	private List<UserIngredient> myGroceryList;
	private List<UserIngredient> myPantryList;
	private List<UserTicket> myTicketsList;
	
	public User() {
	}

	public User(String id, String name, String surname, String email, String password, String avatar,
			List<String> recipesSavedIds, List<UserIngredient> myGroceryList, List<UserIngredient> myPantryList, List<UserTicket> myTicketsList) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.avatar = avatar;
		this.recipesSavedIds = recipesSavedIds;
		this.myGroceryList = myGroceryList;
		this.myPantryList = myPantryList;
		this.myTicketsList = myTicketsList;
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

	public List<String> getRecipesSavedIds() {
		return recipesSavedIds;
	}

	public void setRecipesSavedIds(List<String> recipesSavedIds) {
		this.recipesSavedIds = recipesSavedIds;
	}

	public List<UserIngredient> getMyGroceryList() {
		return myGroceryList;
	}

	public void setMyGroceryList(List<UserIngredient> myGroceryList) {
		this.myGroceryList = myGroceryList;
	}

	public List<UserIngredient> getMyPantryList() {
		return myPantryList;
	}

	public void setMyPantryList(List<UserIngredient> myPantryList) {
		this.myPantryList = myPantryList;
	}

	public List<UserTicket> getMyTicketsList() {
		return myTicketsList;
	}

	public void setMyTicketsList(List<UserTicket> myTicketsList) {
		this.myTicketsList = myTicketsList;
	}
}
