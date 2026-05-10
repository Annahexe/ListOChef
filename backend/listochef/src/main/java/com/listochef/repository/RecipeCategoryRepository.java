package com.listochef.repository;

import com.listochef.model.RecipeCategory;
import java.util.List;

/**
 * Repository interface for recipe category operations.
 *
 * This interface defines the contract for retrieving recipe categories from the
 * database.
 */
public interface RecipeCategoryRepository {

	/**
	 * Retrieves all recipe categories from the database.
	 *
	 * @return List of RecipeCategory objects.
	 */
	List<RecipeCategory> findAll();
}