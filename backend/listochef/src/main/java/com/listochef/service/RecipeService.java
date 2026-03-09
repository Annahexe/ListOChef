package com.listochef.service;

import org.springframework.stereotype.Service;

import com.listochef.model.Recipe;
import com.listochef.repository.RecipeRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository repository;

    public RecipeService(RecipeRepository repository) {
        this.repository = repository;
    }

    // 🔹 Crear receta
    public void createRecipe(Recipe recipe) {
    	
    	System.out.println(recipe.toString());

        // Validaciones básicas
        if (recipe.getRecipeName() == null || recipe.getRecipeName().isBlank()) {
            throw new IllegalArgumentException("Recipe name cannot be empty");
        }

        if (recipe.getUser() == null || recipe.getUser().isBlank()) {
            throw new IllegalArgumentException("User cannot be empty");
        }

        // Fecha automática desde backend
        recipe.setCreationDate(Instant.now());
        
        repository.save(recipe);
    }

    // 🔹 Obtener todas
    public List<Recipe> findAll() {
        return repository.findAll();
    }

    // 🔹 Obtener por ID
    public Optional<Recipe> findById(String id) {

        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("Id cannot be empty");
        }

        return repository.findById(id);
    }

    public List<Recipe> findByFilters(String category, String recipeName) {
        return repository.findByFilters(category, recipeName);
    }
    
 // 🔹 Obtener por usuario 
    public List<Recipe> findByUser(String userNickname) {

        if (userNickname == null || userNickname.isBlank()) {
            throw new IllegalArgumentException("Id cannot be empty");
        }
        
		return repository.findByUser(userNickname);
    }
    
    public List<Recipe> getUserRecipesSaved(String email){
    	return repository.getUserRecipesSaved(email);
    }
}
