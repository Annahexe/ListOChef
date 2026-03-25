package com.listochef.repository;

import com.listochef.model.Ingredient;
import java.util.List;
import java.util.Optional;

public interface IngredientRepository {
	
    Optional<Ingredient> findById(String id);
    
    List<Ingredient> findAllByIds(List<String> ids);
}