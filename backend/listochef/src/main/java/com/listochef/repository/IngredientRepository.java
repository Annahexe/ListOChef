package com.listochef.repository;

import com.listochef.model.Ingredient;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for ingredient operations.
 *
 * This interface defines the contract for accessing ingredient data from the
 * database, including search and bulk retrieval methods.
 */
public interface IngredientRepository {

	/**
	 * Finds an ingredient by its unique identifier.
	 *
	 * @param id Ingredient ID.
	 * @return Optional containing the ingredient if found.
	 */
	Optional<Ingredient> findById(String id);

	/**
	 * Retrieves a list of ingredients matching the provided IDs.
	 *
	 * @param ids List of ingredient IDs.
	 * @return List of matching Ingredient objects.
	 */
	List<Ingredient> findAllByIds(List<String> ids);

	/**
	 * Retrieves all ingredients from the database.
	 *
	 * @return List of all ingredients.
	 */
	List<Ingredient> findAll();
}