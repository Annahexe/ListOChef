package com.listochef.repository;

import java.util.Optional;

import com.listochef.model.User;

public interface UserRepository {

	Optional<User> findByEmail(String email);
		
	User register(User user);
	
	User setPassword(User user);
	
	void updateRecipesSaved(String email, String recipeId);
	
	User editProfile(User user);
	
}
