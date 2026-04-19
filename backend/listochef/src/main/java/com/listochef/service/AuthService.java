package com.listochef.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.listochef.model.IngredientCategory;
import com.listochef.model.Recipe;
import com.listochef.model.RecipeCategory;
import com.listochef.model.RecipeTag;
import com.listochef.model.User;
import com.listochef.repository.MongoIngredientCategoryRepository;
import com.listochef.repository.MongoRecipeRepository;
import com.listochef.repository.RecipeCategoryRepository;
import com.listochef.repository.RecipeTagRepository;
import com.listochef.repository.UserRepository;
import com.listochef.security.JWTService;

@Service
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final MongoRecipeRepository recipeRepository;
    private final MongoIngredientCategoryRepository ingredientCategoryRepository; 
    private final RecipeTagRepository recipeTagRepository;           
    private final RecipeCategoryRepository recipeCategoryRepository;

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder,
                       JWTService jwtService, MongoRecipeRepository recipeRepository,
                       MongoIngredientRepository ingredientRepository, MongoIngredientCategoryRepository ingredientCategoryRepository, RecipeTagRepository recipeTagRepository,
                       RecipeCategoryRepository recipeCategoryRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.recipeRepository = recipeRepository;
        this.ingredientCategoryRepository = ingredientCategoryRepository;
        this.recipeTagRepository = recipeTagRepository;
        this.recipeCategoryRepository = recipeCategoryRepository;
    }

    public Map<String, Object> login(User user) {
        Optional<User> userOptional = repository.findByEmail(user.getEmail());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }

        User storedUser = userOptional.get();

        if (!passwordEncoder.matches(user.getPassword(), storedUser.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(storedUser.getEmail());

        // Lookup de objetos completos
        List<Recipe> recipesSavedList = recipeRepository.getUserRecipesSaved(storedUser.getEmail());
        List<Ingredient> groceryList = ingredientRepository.findAllByIds(storedUser.getMyGroceryList());
        List<IngredientCategory> ingredientsCategories = ingredientCategoryRepository.getAllIngredientsCategories();
        List<RecipeTag> listRecipesTags = recipeTagRepository.findAll();
        List<RecipeCategory> listRecipesCategories = recipeCategoryRepository.findAll();


        storedUser.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", storedUser);
        response.put("recipesSavedList", recipesSavedList);
        response.put("myGroceryList", storedUser.getMyGroceryList());
        response.put("myPantryList", storedUser.getMyPantryList());
        response.put("listIngredientsTags", ingredientsCategories);
        response.put("listRecipesTags", listRecipesTags); 
        response.put("listRecipesCategories", listRecipesCategories);


        return response;
    }
}
