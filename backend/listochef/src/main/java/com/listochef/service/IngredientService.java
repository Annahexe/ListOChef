package com.listochef.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.listochef.model.Ingredient;
import com.listochef.repository.IngredientRepository;

/**
 * Service responsible for managing ingredient-related operations.
 *
 * This class acts as an intermediary between the controller layer
 * and the ingredient repository, providing business logic for ingredients.
 */
@Service
public class IngredientService {

	private final IngredientRepository ingredientRepository;

	/**
	 * Constructor of IngredientService.
	 *
	 * @param ingredientRepository Repository used to access ingredient data.
	 */
	public IngredientService(IngredientRepository ingredientRepository) {
		this.ingredientRepository = ingredientRepository;
	}

	/**
	 * Retrieves all ingredients stored in the database.
	 *
	 * @return List of all ingredients.
	 */
	public List<Ingredient> getAllIngredients() {
		return ingredientRepository.findAll();
	}
}