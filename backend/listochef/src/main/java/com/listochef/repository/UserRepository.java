package com.listochef.repository;

import java.util.List;
import com.listochef.model.UserIngredient;

import java.util.Optional;

import com.listochef.model.User;
import com.mongodb.client.result.UpdateResult;

public interface UserRepository {

	Optional<User> findByEmail(String email);
		
	User register(User user);
	
	User setPassword(User user);
		
	User editProfile(User user);
	
	void addToRecipesSaved(String email, String recipeId);
	
	UpdateResult deleteFromRecipesSaved(String email, String recipeId);
	
	void removeFromGroceryList(String email, String ingredientName);
	
	void removeFromPantryList(String email, String ingredientName);
	
	void updateGroceryList(String email, List<UserIngredient> ingredients);
	}
