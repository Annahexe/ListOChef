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
    public void createRecipe(Recipe recipe, String email) {
    	
    	System.out.println(recipe.toString());

        // Validaciones básicas
        if (recipe.getRecipeName() == null || recipe.getRecipeName().isBlank()) {
            throw new IllegalArgumentException("Recipe name cannot be empty");
        }

        // Fecha automática desde backend
        recipe.setCreationDate(Instant.now());
        
        repository.save(recipe, email);
    }

    // 🔹 Obtener todas
    public List<Recipe> findAll(String email) {    	
        return repository.findAll(email);
    }

    // 🔹 Obtener por ID
    public Optional<Recipe> findById(String id, String email) {

        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("Id cannot be empty");
        }

        return repository.findById(id, email);
    }

    public List<Recipe> findByFilters(String category, String recipeName, String email) {
        return repository.findByFilters(category, recipeName, email);
    }
    
 // 🔹 Obtener por usuario 
//    public List<Recipe> findByUser(String userNickname) {
//
//        if (userNickname == null || userNickname.isBlank()) {
//            throw new IllegalArgumentException("Id cannot be empty");
//        }
//        
//		return repository.findByUser(userNickname);
//    }
    
    public List<Recipe> getUserRecipesSaved(String email){
    	return repository.getUserRecipesSaved(email);
    }
}
