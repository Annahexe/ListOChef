package com.listochef.repository;

import java.util.List;

import java.util.Optional;

import com.listochef.model.User;
import com.listochef.model.UserIngredient;
import com.listochef.model.UserTicket;
import com.mongodb.client.result.UpdateResult;

public interface UserRepository {

	Optional<User> findByEmail(String email);
		
	User register(User user);
	
	User setPassword(User user);
		
	User editProfile(User user);
	
	void addToRecipesSaved(String email, String recipeId);
	
	UpdateResult deleteFromRecipesSaved(String email, String recipeId);
	
	void updatePantryList (String email, List<UserIngredient> userIngredients);
	
	void removeFromGroceryList(String email, String ingredientName);
	
	void removeFromPantryList(String email, String ingredientName);
	
	void updateGroceryList(String email, List<UserIngredient> ingredients);
	
	UserTicket createTicket(String email, UserTicket newTicket);
	
	UserTicket findTicketById(String email, String ticketId);
	
	void deleteTicket(String email, String ticketId);
	
	void deleteUser(String userId);
	
	List<User> getUsers();
	}
