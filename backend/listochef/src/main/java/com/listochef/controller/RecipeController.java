package com.listochef.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.listochef.model.Recipe;
import com.listochef.service.RecipeService;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Controller responsible for managing recipes.
 *
 * Base URL: /ListOChef/recipes
 */
@RestController
@RequestMapping("/ListOChef/recipes")
public class RecipeController {

	private final RecipeService service;
	private final ObjectMapper mapper;

	/**
	 * Constructor of the RecipeController.
	 *
	 * @param service Recipe business logic service.
	 * @param mapper  JSON mapper utility.
	 */
	public RecipeController(RecipeService service, ObjectMapper mapper) {
		this.service = service;
		this.mapper = mapper;
	}

	/**
	 * Creates a new recipe.
	 *
	 * Endpoint: POST /createRecipe
	 *
	 * @param email      Authenticated user email.
	 * @param recipeJson Recipe data in JSON format.
	 * @param photo      Optional image of the recipe.
	 */
	@PostMapping(value = "/createRecipe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> createRecipe(@AuthenticationPrincipal String email,
			@RequestPart("recipe") String recipeJson,
			@RequestPart(value = "photo", required = false) MultipartFile photo) throws Exception {

		Recipe recipe = mapper.readValue(recipeJson, Recipe.class);
		service.createRecipe(recipe, email, photo);

		return ResponseEntity.ok().build();
	}

	/**
	 * Retrieves all recipes.
	 *
	 * Endpoint: GET /recipes
	 */
	@GetMapping
	public ResponseEntity<List<Recipe>> getAllRecipes(@AuthenticationPrincipal String email) {
		return ResponseEntity.ok(service.findAll(email));
	}

	/**
	 * Retrieves a recipe by ID.
	 *
	 * Endpoint: GET /recipes/{id}
	 *
	 * @param id Recipe identifier.
	 */
	@GetMapping("/{id}")
	public ResponseEntity<Recipe> getRecipeById(@AuthenticationPrincipal String email, @PathVariable String id) {

		return service.findById(id, email).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	/**
	 * Searches recipes using filters.
	 *
	 * Endpoint: GET /recipes/search
	 *
	 * @param category   Recipe category filter.
	 * @param recipeName Recipe name filter.
	 */
	@GetMapping("/search")
	public ResponseEntity<List<Recipe>> getRecipes(@AuthenticationPrincipal String email,
			@RequestParam(required = false) String category, @RequestParam(required = false) String recipeName) {

		return ResponseEntity.ok(service.findByFilters(category, recipeName, email));
	}

	/**
	 * Retrieves saved recipes of the authenticated user.
	 *
	 * Endpoint: GET /recipes/userRecipesSaved
	 */
	@GetMapping("/userRecipesSaved")
	public ResponseEntity<List<Recipe>> getUserRecipesSaved(@AuthenticationPrincipal String email) {
		return ResponseEntity.ok(service.getUserRecipesSaved(email));
	}
}