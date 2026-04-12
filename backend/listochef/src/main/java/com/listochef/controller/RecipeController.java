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

@RestController
@RequestMapping("/ListOChef/recipes")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    // 🔹 Crear receta
    @PostMapping(value = "/createRecipe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createRecipe(
        @AuthenticationPrincipal String email,
        @RequestPart("recipe") String recipeJson,
        @RequestPart(value = "photo", required = false) MultipartFile photo
    ) throws Exception {

        ObjectMapper mapper = new ObjectMapper();
        Recipe recipe = mapper.readValue(recipeJson, Recipe.class);

        service.createRecipe(recipe, email, photo);

        return ResponseEntity.ok().build();
    }
    


    // 🔹 Obtener todas
    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes(@AuthenticationPrincipal String email) {        
        return ResponseEntity.ok(service.findAll(email));
    }

    // 🔹 Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@AuthenticationPrincipal String email, @PathVariable String id) {
        return service.findById(id, email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> getRecipes(
    		@AuthenticationPrincipal String email,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String recipeName) {

        return ResponseEntity.ok(service.findByFilters(category, recipeName, email));
    }
    
//    @GetMapping("/userRecipes")
//    public ResponseEntity<List<Recipe>> getRecipesUser(
//    		@AuthenticationPrincipal String email) {
//
//        return ResponseEntity.ok(service.findByUser(email));
//    }
    
    @GetMapping("/userRecipesSaved")
    public ResponseEntity<List<Recipe>> getUserRecipesSaved(
    		@AuthenticationPrincipal String email) {

        return ResponseEntity.ok(service.getUserRecipesSaved(email));
    }
    
}
