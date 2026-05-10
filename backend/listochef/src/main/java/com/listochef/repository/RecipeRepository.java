package com.listochef.repository;

import java.util.List;
import java.util.Optional;

import com.listochef.model.Recipe;

/**
 * Repository interface for recipe operations.
 *
 * This interface defines the contract for accessing and managing recipe data,
 * including filtering and user-specific queries.
 */
public interface RecipeRepository {

    /**
     * Saves a recipe in the database associated with a specific user.
     *
     * @param recipe Recipe object to save.
     * @param email Email of the user who owns the recipe.
     * @return Saved Recipe object.
     */
    Recipe save(Recipe recipe, String email);

    /**
     * Finds a recipe by its ID for a specific user.
     *
     * @param id Recipe identifier.
     * @param email User email.
     * @return Optional containing the recipe if found.
     */
    Optional<Recipe> findById(String id, String email);

    /**
     * Retrieves all recipes available for a specific user.
     *
     * @param email User email.
     * @return List of recipes.
     */
    List<Recipe> findAll(String email);

    /**
     * Retrieves recipes filtered by category and/or name.
     *
     * @param category Recipe category filter.
     * @param recipeName Recipe name filter.
     * @param email User email.
     * @return List of filtered recipes.
     */
    List<Recipe> findByFilters(String category, String recipeName, String email);

    /**
     * Retrieves all recipes saved by a specific user.
     *
     * @param userEmail User email.
     * @return List of saved recipes.
     */
    List<Recipe> getUserRecipesSaved(String userEmail);
}