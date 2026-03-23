package com.listochef.repository;

import java.util.List;
import java.util.Optional;

import com.listochef.model.Recipe;

public interface RecipeRepository {

	Recipe save(Recipe recipe, String email);

	Optional<Recipe> findById(String id,  String email);

	List<Recipe> findAll(String email);
	
	List<Recipe> findByFilters(String category, String recipeName,  String email);
	
	//List<Recipe> findByUser(String email);
	
	List<Recipe> getUserRecipesSaved(String userEmail);
}
