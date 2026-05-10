package com.listochef.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.listochef.model.Ingredient;
import com.listochef.model.IngredientCategory;
import com.listochef.model.Recipe;
import com.listochef.model.RecipeCategory;
import com.listochef.model.RecipeTag;
import com.listochef.model.User;
import com.listochef.repository.MongoIngredientCategoryRepository;
import com.listochef.repository.MongoIngredientRepository;
import com.listochef.repository.MongoRecipeRepository;
import com.listochef.repository.RecipeCategoryRepository;
import com.listochef.repository.RecipeTagRepository;
import com.listochef.repository.UserRepository;
import com.listochef.security.JWTService;

/**
 * Service responsible for authentication and login logic.
 *
 * This class handles: - User authentication - Password validation - JWT token
 * generation - Loading initial application data (recipes, categories, tags,
 * etc.)
 */
@Service
public class AuthService {

	private final UserRepository repository;
	private final PasswordEncoder passwordEncoder;
	private final JWTService jwtService;
	private final MongoRecipeRepository recipeRepository;
	private final MongoIngredientCategoryRepository ingredientCategoryRepository;
	private final RecipeTagRepository recipeTagRepository;
	private final RecipeCategoryRepository recipeCategoryRepository;
	private final MongoIngredientRepository ingredientRepository;

	/**
	 * Constructor of AuthService.
	 *
	 * @param repository                   User repository for database access.
	 * @param passwordEncoder              Encoder used for password verification.
	 * @param jwtService                   Service responsible for JWT generation.
	 * @param recipeRepository             Repository for recipes.
	 * @param ingredientRepository         Repository for ingredients.
	 * @param ingredientCategoryRepository Repository for ingredient categories.
	 * @param recipeTagRepository          Repository for recipe tags.
	 * @param recipeCategoryRepository     Repository for recipe categories.
	 */
	public AuthService(UserRepository repository, PasswordEncoder passwordEncoder, JWTService jwtService,
			MongoRecipeRepository recipeRepository, MongoIngredientRepository ingredientRepository,
			MongoIngredientCategoryRepository ingredientCategoryRepository, RecipeTagRepository recipeTagRepository,
			RecipeCategoryRepository recipeCategoryRepository) {

		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.recipeRepository = recipeRepository;
		this.ingredientCategoryRepository = ingredientCategoryRepository;
		this.recipeTagRepository = recipeTagRepository;
		this.recipeCategoryRepository = recipeCategoryRepository;
		this.ingredientRepository = ingredientRepository;
	}

	/**
	 * Authenticates a user and returns login information.
	 *
	 * This method: - Normalizes email input - Validates user credentials -
	 * Generates a JWT token - Loads initial application data (recipes, categories,
	 * tags, etc.)
	 *
	 * @param user User object containing login credentials.
	 * @return Map containing JWT token, user data, and initial app datasets.
	 * @throws RuntimeException if credentials are invalid.
	 */
	public Map<String, Object> login(User user) {

		if (user.getEmail() != null) {
			user.setEmail(user.getEmail().toLowerCase().trim());
		}

		Optional<User> userOptional = repository.findByEmail(user.getEmail());

		if (userOptional.isEmpty()) {
			throw new RuntimeException("Invalid credentials");
		}

		User storedUser = userOptional.get();

		if (!passwordEncoder.matches(user.getPassword(), storedUser.getPassword())) {
			throw new RuntimeException("Invalid credentials");
		}

		String token = jwtService.generateToken(storedUser.getEmail(), storedUser.getRole());

		// Load initial data for frontend after login
		List<Recipe> recipesSavedList = recipeRepository.getUserRecipesSaved(storedUser.getEmail());
		List<IngredientCategory> ingredientsCategories = ingredientCategoryRepository.getAllIngredientsCategories();
		List<RecipeTag> listRecipesTags = recipeTagRepository.findAll();
		List<RecipeCategory> listRecipesCategories = recipeCategoryRepository.findAll();

		storedUser.setPassword(null);

		Map<String, Object> response = new HashMap<>();
		response.put("token", token);
		response.put("user", storedUser);
		response.put("recipesSavedList", recipesSavedList);
		response.put("listIngredientsTags", ingredientsCategories);
		response.put("listRecipesTags", listRecipesTags);
		response.put("listRecipesCategories", listRecipesCategories);

		return response;
	}
}