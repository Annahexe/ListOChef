package com.listochef.repository;

import java.util.List;

import com.listochef.model.IngredientCategory;

/**
 * Repository interface for ingredient category operations.
 *
 * This interface defines the contract for accessing and retrieving ingredient
 * category data from the database.
 */
public interface IngredientCategoryRepository {

	/**
	 * Retrieves all ingredient categories from the database.
	 *
	 * @return List of all IngredientCategory objects.
	 */
	List<IngredientCategory> getAllIngredientsCategories();
}
