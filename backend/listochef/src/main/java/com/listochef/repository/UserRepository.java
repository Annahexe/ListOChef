package com.listochef.repository;

import java.util.List;

import java.util.Optional;

import com.listochef.model.User;
import com.listochef.model.UserIngredient;
import com.listochef.model.UserTicket;
import com.mongodb.client.result.UpdateResult;

/**
 * Repository interface for user operations.
 *
 * This interface defines the contract for managing users, including
 * authentication-related actions, profile updates, pantry/grocery management,
 * saved recipes, and tickets.
 */
public interface UserRepository {

	/**
	 * Finds a user by their email address.
	 *
	 * @param email User email.
	 * @return Optional containing the user if found.
	 */
	Optional<User> findByEmail(String email);

	/**
	 * Registers a new user in the database.
	 *
	 * @param user User object to register.
	 * @return Registered User.
	 */
	User register(User user);

	/**
	 * Updates the user's password.
	 *
	 * @param user User with updated password.
	 * @return Updated User.
	 */
	User setPassword(User user);

	/**
	 * Updates user profile information.
	 *
	 * @param user User object with updated profile data.
	 * @return Updated User.
	 */
	User editProfile(User user);

	/**
	 * Adds a recipe to the user's saved recipes list.
	 *
	 * @param email    User email.
	 * @param recipeId Recipe identifier.
	 */
	void addToRecipesSaved(String email, String recipeId);

	/**
	 * Removes a recipe from the user's saved recipes list.
	 *
	 * @param email    User email.
	 * @param recipeId Recipe identifier.
	 * @return UpdateResult indicating the modification result.
	 */
	UpdateResult deleteFromRecipesSaved(String email, String recipeId);

	/**
	 * Updates the user's pantry list.
	 *
	 * @param email           User email.
	 * @param userIngredients List of ingredients in pantry.
	 */
	void updatePantryList(String email, List<UserIngredient> userIngredients);

	/**
	 * Removes an ingredient from the user's grocery list.
	 *
	 * @param email          User email.
	 * @param ingredientName Ingredient name.
	 */
	void removeFromGroceryList(String email, String ingredientName);

	/**
	 * Removes an ingredient from the user's pantry list.
	 *
	 * @param email          User email.
	 * @param ingredientName Ingredient name.
	 */
	void removeFromPantryList(String email, String ingredientName);

	/**
	 * Updates the user's grocery list.
	 *
	 * @param email       User email.
	 * @param ingredients List of ingredients.
	 */
	void updateGroceryList(String email, List<UserIngredient> ingredients);

	/**
	 * Creates a new ticket for the user.
	 *
	 * @param email     User email.
	 * @param newTicket Ticket object.
	 * @return Created UserTicket.
	 */
	UserTicket createTicket(String email, UserTicket newTicket);

	/**
	 * Finds a ticket by its ID for a specific user.
	 *
	 * @param email    User email.
	 * @param ticketId Ticket identifier.
	 * @return UserTicket if found.
	 */
	UserTicket findTicketById(String email, String ticketId);

	/**
	 * Deletes a ticket from the user's account.
	 *
	 * @param email    User email.
	 * @param ticketId Ticket identifier.
	 */
	void deleteTicket(String email, String ticketId);

	/**
	 * Deletes a user from the database.
	 *
	 * @param userId User identifier.
	 */
	void deleteUser(String userId);

	/**
	 * Retrieves all users from the database.
	 *
	 * @return List of users.
	 */
	List<User> getUsers();
}