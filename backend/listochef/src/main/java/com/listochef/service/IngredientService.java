package com.listochef.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.listochef.model.Ingredient;
import com.listochef.repository.IngredientRepository;

@Service
public class IngredientService {

	private final IngredientRepository ingredientRepository;

	public IngredientService(IngredientRepository ingredientRepository) {
		this.ingredientRepository = ingredientRepository;
	}

	public List<Ingredient> getAllIngredients() {
		return ingredientRepository.findAll();
	}
}