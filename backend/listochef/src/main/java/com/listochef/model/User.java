package com.listochef.model;

import java.util.List;

/**
 * Model that represents a user in the system.
 *
 * This class stores all user-related information including personal data,
 * authentication credentials, saved recipes, pantry and grocery lists, tickets,
 * and role permissions.
 */
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
	private String role;

	/**
	 * Empty constructor of the User class.
	 */
	public User() {
	}

	/**
	 * Parameterized constructor of the User class.
	 *
	 * @param id              Unique identifier of the user.
	 * @param name            User's name.
	 * @param surname         User's surname.
	 * @param email           User's email address.
	 * @param password        User's encrypted password.
	 * @param avatar          User profile image.
	 * @param recipesSavedIds List of saved recipe IDs.
	 * @param myGroceryList   User's grocery list.
	 * @param myPantryList    User's pantry list.
	 * @param myTicketsList   List of support tickets created by the user.
	 * @param role            User role (e.g., USER, ADMIN).
	 */
	public User(String id, String name, String surname, String email, String password, String avatar,
			List<String> recipesSavedIds, List<UserIngredient> myGroceryList, List<UserIngredient> myPantryList,
			List<UserTicket> myTicketsList, String role) {

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
		this.setRole(role);
	}

	/**
	 * Gets the user ID.
	 *
	 * @return User ID.
	 */
	public String getId() {
		return id;
	}

	/**
	 * Sets the user ID.
	 *
	 * @param id New user ID.
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * Gets the user name.
	 *
	 * @return User name.
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets the user name.
	 *
	 * @param name New user name.
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets the user surname.
	 *
	 * @return User surname.
	 */
	public String getSurname() {
		return surname;
	}

	/**
	 * Sets the user surname.
	 *
	 * @param surname New user surname.
	 */
	public void setSurname(String surname) {
		this.surname = surname;
	}

	/**
	 * Gets the user email.
	 *
	 * @return User email.
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Sets the user email.
	 *
	 * @param email New user email.
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Gets the user password.
	 *
	 * @return User password.
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Sets the user password.
	 *
	 * @param password New user password.
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Gets the user avatar.
	 *
	 * @return User avatar URL.
	 */
	public String getAvatar() {
		return avatar;
	}

	/**
	 * Sets the user avatar.
	 *
	 * @param avatar New avatar URL.
	 */
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	/**
	 * Gets the list of saved recipe IDs.
	 *
	 * @return List of saved recipe IDs.
	 */
	public List<String> getRecipesSavedIds() {
		return recipesSavedIds;
	}

	/**
	 * Sets the list of saved recipe IDs.
	 *
	 * @param recipesSavedIds New list of saved recipes.
	 */
	public void setRecipesSavedIds(List<String> recipesSavedIds) {
		this.recipesSavedIds = recipesSavedIds;
	}

	/**
	 * Gets the user's grocery list.
	 *
	 * @return Grocery list.
	 */
	public List<UserIngredient> getMyGroceryList() {
		return myGroceryList;
	}

	/**
	 * Sets the user's grocery list.
	 *
	 * @param myGroceryList New grocery list.
	 */
	public void setMyGroceryList(List<UserIngredient> myGroceryList) {
		this.myGroceryList = myGroceryList;
	}

	/**
	 * Gets the user's pantry list.
	 *
	 * @return Pantry list.
	 */
	public List<UserIngredient> getMyPantryList() {
		return myPantryList;
	}

	/**
	 * Sets the user's pantry list.
	 *
	 * @param myPantryList New pantry list.
	 */
	public void setMyPantryList(List<UserIngredient> myPantryList) {
		this.myPantryList = myPantryList;
	}

	/**
	 * Gets the user's ticket list.
	 *
	 * @return List of support tickets.
	 */
	public List<UserTicket> getMyTicketsList() {
		return myTicketsList;
	}

	/**
	 * Sets the user's ticket list.
	 *
	 * @param myTicketsList New ticket list.
	 */
	public void setMyTicketsList(List<UserTicket> myTicketsList) {
		this.myTicketsList = myTicketsList;
	}

	/**
	 * Gets the user role.
	 *
	 * @return User role.
	 */
	public String getRole() {
		return role;
	}

	/**
	 * Sets the user role.
	 *
	 * @param role New role (USER, ADMIN, etc.).
	 */
	public void setRole(String role) {
		this.role = role;
	}
}