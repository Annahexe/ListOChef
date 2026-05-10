package com.listochef.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.listochef.model.Recipe;
import com.listochef.model.UploadResult;
import com.listochef.repository.RecipeRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

/**
 * Service responsible for managing recipe-related operations.
 *
 * This class handles the business logic for:
 * - Creating recipes
 * - Retrieving recipes
 * - Filtering recipes
 * - Managing recipe images
 * - Handling user-specific recipe data
 */
@Service
public class RecipeService {

    private final RecipeRepository repository;
    private final CloudinaryImageStorageService cloudinaryService;

    /**
     * Constructor of RecipeService.
     *
     * @param repository Repository used for recipe persistence.
     * @param cloudinaryService Service used for image upload handling.
     */
    public RecipeService(RecipeRepository repository,
                         CloudinaryImageStorageService cloudinaryService) {
        this.repository = repository;
        this.cloudinaryService = cloudinaryService;
    }

    /**
     * Creates a new recipe.
     *
     * This method:
     * - Validates required fields
     * - Uploads image to Cloudinary if provided
     * - Sets creation date automatically
     * - Saves recipe in the database
     *
     * @param recipe Recipe object to be created.
     * @param email Email of the user creating the recipe.
     * @param photo Optional image file for the recipe.
     * @throws IllegalArgumentException if required fields are missing.
     */
    public void createRecipe(Recipe recipe, String email, MultipartFile photo) {

        System.out.println(recipe.toString());

        if (recipe.getRecipeName() == null || recipe.getRecipeName().isBlank()) {
            throw new IllegalArgumentException("Recipe name cannot be empty");
        }

        if (photo != null && !photo.isEmpty()) {
            UploadResult res = cloudinaryService.upload(photo, email);
            recipe.setPhoto(res.getImageUrl());
        }

        recipe.setCreationDate(Instant.now());

        repository.save(recipe, email);
    }

    /**
     * Retrieves all recipes available for a specific user.
     *
     * @param email User email requesting the recipes.
     * @return List of recipes.
     */
    public List<Recipe> findAll(String email) {
        return repository.findAll(email);
    }

    /**
     * Finds a recipe by its ID for a specific user.
     *
     * @param id Recipe identifier.
     * @param email User email requesting the recipe.
     * @return Optional containing the recipe if found.
     * @throws IllegalArgumentException if id is empty.
     */
    public Optional<Recipe> findById(String id, String email) {

        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("Id cannot be empty");
        }

        return repository.findById(id, email);
    }

    /**
     * Retrieves recipes filtered by category and/or name.
     *
     * @param category Recipe category filter.
     * @param recipeName Recipe name filter.
     * @param email User email requesting the data.
     * @return List of filtered recipes.
     */
    public List<Recipe> findByFilters(String category, String recipeName, String email) {
        return repository.findByFilters(category, recipeName, email);
    }

    /**
     * Retrieves recipes saved by a specific user.
     *
     * @param email User email.
     * @return List of saved recipes.
     */
    public List<Recipe> getUserRecipesSaved(String email) {
        return repository.getUserRecipesSaved(email);
    }
}