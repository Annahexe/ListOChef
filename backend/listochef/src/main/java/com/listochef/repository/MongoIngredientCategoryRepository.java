package com.listochef.repository;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.stereotype.Repository;

import com.listochef.model.IngredientCategory;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

/**
 * MongoDB implementation of IngredientCategoryRepository.
 *
 * This class handles direct communication with the MongoDB collection
 * "ingredients_categories" and maps documents to IngredientCategory objects.
 */
@Repository
public class MongoIngredientCategoryRepository implements IngredientCategoryRepository {

	private final MongoCollection<Document> collection;

	/**
	 * Constructor of MongoIngredientCategoryRepository.
	 *
	 * @param database MongoDB database instance.
	 */
	public MongoIngredientCategoryRepository(MongoDatabase database) {
		this.collection = database.getCollection("ingredients_categories");
	}

	/**
	 * Retrieves all ingredient categories from MongoDB.
	 *
	 * This method: - Queries the entire collection - Converts each Document into an
	 * IngredientCategory object
	 *
	 * @return List of IngredientCategory objects.
	 */
	@Override
	public List<IngredientCategory> getAllIngredientsCategories() {

		List<IngredientCategory> ingredientsCategories = new ArrayList<>();

		for (Document doc : collection.find()) {
			IngredientCategory ingredientCategory = toIngredientCategory(doc);
			ingredientsCategories.add(ingredientCategory);
		}

		return ingredientsCategories;
	}

	/**
	 * Converts a MongoDB Document into an IngredientCategory object.
	 *
	 * @param doc MongoDB document.
	 * @return Mapped IngredientCategory instance.
	 */
	private IngredientCategory toIngredientCategory(Document doc) {
		return new IngredientCategory(doc.getObjectId("_id").toHexString(), doc.getString("ingredientCategoryName"),
				doc.getString("icon"));
	}
}
