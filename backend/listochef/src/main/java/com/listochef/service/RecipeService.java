package com.listochef.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.listochef.model.Recipe;
import com.listochef.model.UploadResult;
import com.listochef.repository.RecipeRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    private final RecipeRepository repository;
    private final CloudinaryImageStorageService cloudinaryService;

    public RecipeService(RecipeRepository repository, CloudinaryImageStorageService cloudinaryService) {
        this.repository = repository;
        this.cloudinaryService = cloudinaryService;
    }

    // 🔹 Crear receta
    public void createRecipe(Recipe recipe, String email, MultipartFile photo) {
    	
    	System.out.println(recipe.toString());

        // Validaciones básicas
        if (recipe.getRecipeName() == null || recipe.getRecipeName().isBlank()) {
            throw new IllegalArgumentException("Recipe name cannot be empty");
        }
        
        // Si tiene foto, la sube
        if (photo != null && !photo.isEmpty()) {
            UploadResult res = cloudinaryService.upload(photo, email);
            recipe.setPhoto(res.getImageUrl());
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
