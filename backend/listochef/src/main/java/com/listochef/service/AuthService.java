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
import com.listochef.model.User;
import com.listochef.repository.MongoIngredientCategoryRepository;
import com.listochef.repository.MongoIngredientRepository;
import com.listochef.repository.MongoRecipeRepository;
import com.listochef.repository.UserRepository;
import com.listochef.security.JWTService;

@Service
public class AuthService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final MongoRecipeRepository recipeRepository;
    private final MongoIngredientRepository ingredientRepository;
    private final MongoIngredientCategoryRepository ingredientCategoryRepository; 

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder,
                       JWTService jwtService, MongoRecipeRepository recipeRepository,
                       MongoIngredientRepository ingredientRepository, MongoIngredientCategoryRepository ingredientCategoryRepository) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.ingredientCategoryRepository = ingredientCategoryRepository;
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
        List<Recipe> recipesSaved = recipeRepository.getUserRecipesSaved(storedUser.getEmail());
        List<Ingredient> groceryList = ingredientRepository.findAllByIds(storedUser.getMyGroceryList());
        List<IngredientCategory> ingredientsCategories = ingredientCategoryRepository.getAllIngredientsCategories();

        storedUser.setPassword(null);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", storedUser);
        response.put("recipesSaved", recipesSaved);
        response.put("groceryList", groceryList);
        response.put("listIngredientsTags", ingredientsCategories);

        return response;
    }
}
