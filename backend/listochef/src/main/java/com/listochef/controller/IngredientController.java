package com.listochef.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.listochef.model.Ingredient;
import com.listochef.service.IngredientService;

/**
 * Controller responsible for managing ingredients.
 *
 * Base URL: /ListOChef
 */
@RestController
@RequestMapping("/ListOChef")
public class IngredientController {

	private final IngredientService service;

	/**
	 * Constructor of the IngredientController.
	 *
	 * @param service Ingredient business logic service.
	 */
	public IngredientController(IngredientService service) {
		this.service = service;
	}

	/**
	 * Retrieves all available ingredients.
	 *
	 * Endpoint: GET /ingredients
	 */
	@GetMapping("/ingredients")
	public ResponseEntity<List<Ingredient>> getAllIngredients() {
		return ResponseEntity.ok(service.getAllIngredients());
	}
}