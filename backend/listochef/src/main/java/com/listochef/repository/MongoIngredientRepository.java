package com.listochef.repository;

import com.listochef.model.Ingredient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.mongodb.client.model.Filters.*;

/**
 * MongoDB implementation of IngredientRepository.
 *
 * This class provides direct access to the "ingredients" MongoDB collection and
 * maps documents into Ingredient model objects.
 */
@Repository
public class MongoIngredientRepository implements IngredientRepository {

	private final MongoCollection<Document> collection;

	/**
	 * Constructor of MongoIngredientRepository.
	 *
	 * @param database MongoDB database instance.
	 */
	public MongoIngredientRepository(MongoDatabase database) {
		this.collection = database.getCollection("ingredients");
	}

	/**
	 * Finds an ingredient by its ID.
	 *
	 * This method: - Validates the ObjectId format - Queries MongoDB by _id -
	 * Converts the result into an Ingredient object
	 *
	 * @param id Ingredient identifier.
	 * @return Optional containing Ingredient if found, empty otherwise.
	 */
	@Override
	public Optional<Ingredient> findById(String id) {
		if (id == null || !ObjectId.isValid(id))
			return Optional.empty();

		Document doc = collection.find(eq("_id", new ObjectId(id))).first();

		return doc == null ? Optional.empty() : Optional.of(toIngredient(doc));
	}

	/**
	 * Finds multiple ingredients by their IDs.
	 *
	 * This method iterates over each ID and retrieves the corresponding ingredient.
	 *
	 * @param ids List of ingredient IDs.
	 * @return List of Ingredient objects found.
	 */
	@Override
	public List<Ingredient> findAllByIds(List<String> ids) {
		List<Ingredient> result = new ArrayList<>();
		if (ids == null || ids.isEmpty())
			return result;

		for (String id : ids) {
			findById(id).ifPresent(result::add);
		}

		return result;
	}

	/**
	 * Retrieves all ingredients from the database.
	 *
	 * @return List of all Ingredient objects.
	 */
	@Override
	public List<Ingredient> findAll() {
		List<Ingredient> result = new ArrayList<>();
		List<Document> docs = collection.find().into(new ArrayList<>());

		for (Document doc : docs) {
			result.add(toIngredient(doc));
		}

		return result;
	}

	/**
	 * Converts a MongoDB Document into an Ingredient object.
	 *
	 * @param doc MongoDB document.
	 * @return Mapped Ingredient instance.
	 */
	private Ingredient toIngredient(Document doc) {
		return new Ingredient(doc.getObjectId("_id").toHexString(), doc.getString("ingredientName"),
				doc.getString("ingredientTag"));
	}
}