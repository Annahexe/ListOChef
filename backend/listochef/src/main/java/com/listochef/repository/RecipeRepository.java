package com.listochef.repository;

import java.util.List;
import java.util.Optional;

import com.listochef.model.Recipe;

public interface RecipeRepository {

	Recipe save(Recipe recipe);

	Optional<Recipe> findById(String id);

	List<Recipe> findAll();
	
	List<Recipe> findByFilters(String category, String recipeName);
	
	List<Recipe> findByUser(String email);
	
	List<Recipe> getUserRecipesSaved(String userEmail);
}
