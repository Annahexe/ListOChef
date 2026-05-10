package com.listochef.repository;

import com.listochef.model.RecipeTag;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * MongoDB implementation of RecipeTagRepository.
 *
 * This class provides access to the "tags" collection and maps MongoDB
 * documents into RecipeTag model objects.
 */
@Repository
public class MongoRecipeTagRepository implements RecipeTagRepository {

	private final MongoCollection<Document> collection;

	/**
	 * Constructor of MongoRecipeTagRepository.
	 *
	 * @param database MongoDB database instance.
	 */
	public MongoRecipeTagRepository(MongoDatabase database) {
		this.collection = database.getCollection("tags");
	}

	/**
	 * Retrieves all recipe tags from MongoDB.
	 *
	 * This method: - Queries the entire "tags" collection - Maps each document into
	 * a RecipeTag object
	 *
	 * @return List of RecipeTag objects.
	 */
	@Override
	public List<RecipeTag> findAll() {

		List<RecipeTag> tags = new ArrayList<>();

		for (Document doc : collection.find()) {
			tags.add(new RecipeTag(doc.getObjectId("_id").toHexString(), doc.getString("tag")));
		}

		return tags;
	}
}