package com.listochef.repository;

import com.listochef.model.RecipeTag;
import java.util.List;

/**
 * Repository interface for recipe tag operations.
 *
 * This interface defines the contract for retrieving recipe tags from the
 * database.
 */
public interface RecipeTagRepository {

	/**
	 * Retrieves all recipe tags from the database.
	 *
	 * @return List of RecipeTag objects.
	 */
	List<RecipeTag> findAll();
}