package com.listochef.controller;

import com.listochef.model.Recipe;
import com.listochef.service.RecipeService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/ListOChef/recipes")
public class RecipeController {

    private final RecipeService service;

    public RecipeController(RecipeService service) {
        this.service = service;
    }

    // 🔹 Crear receta
    @PostMapping("/createRecipe")
    public ResponseEntity<Recipe> createRecipe(@AuthenticationPrincipal String email, @RequestBody Recipe recipe) {
    	
    	recipe.setUser(email);
    	
        service.createRecipe(recipe);
        
        
        return ResponseEntity.ok().build();
    }

    // 🔹 Obtener todas
    @GetMapping
    public ResponseEntity<List<Recipe>> getAllRecipes() {        
        return ResponseEntity.ok(service.findAll());
    }

    // 🔹 Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable String id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> getRecipes(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String recipeName) {

        return ResponseEntity.ok(service.findByFilters(category, recipeName));
    }
    
    @GetMapping("/userRecipes")
    public ResponseEntity<List<Recipe>> getRecipesUser(
    		@AuthenticationPrincipal String email) {

        return ResponseEntity.ok(service.findByUser(email));
    }
    
    @GetMapping("/userRecipesSaved")
    public ResponseEntity<List<Recipe>> getUserRecipesSaved(
    		@AuthenticationPrincipal String email) {

        return ResponseEntity.ok(service.getUserRecipesSaved(email));
    }
    
}
