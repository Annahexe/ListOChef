package com.listochef.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.Document;

import com.listochef.model.Recipe;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class MongoRecipeRepository implements RecipeRepository {

	private final MongoCollection<Document> collection;

	public MongoRecipeRepository(MongoDatabase database) {
		this.collection = database.getCollection("recipes");
	}

	@Override
	public Recipe save(Recipe recipe) {

		Document doc = new Document("name", recipe.getName());
		collection.insertOne(doc);

		recipe.set_id(doc.getObjectId("_id"));
		return recipe;
	}

	@Override
	public Optional<Recipe> findById(String id) {

		Document doc = collection.find().first();

		if (doc == null) {
			return Optional.empty();
		}

		Recipe recipe = new Recipe();

		return Optional.of(recipe);
	}

	@Override
	public List<Recipe> findAll() {

		List<Recipe> recipes = new ArrayList<>();
//
//        for (Document doc : collection.find()) {
//            recipes.add(new Recipe(
//                    doc.getObjectId("_id").toString(),
//                    doc.getString("name")
//            ));
//        }

		return recipes;
	}

}
