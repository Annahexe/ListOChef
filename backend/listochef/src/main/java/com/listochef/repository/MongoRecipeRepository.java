package com.listochef.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import java.time.Instant;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import com.listochef.model.Recipe;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

@Repository
public class MongoRecipeRepository implements RecipeRepository {

	private final MongoCollection<Document> collection;

	public MongoRecipeRepository(MongoDatabase database) {
		this.collection = database.getCollection("recipes");
	}

	@Override
	public Recipe save(Recipe recipe) {

		Document doc = new Document().append("user", recipe.getUser()).append("recipeName", recipe.getRecipeName())
				.append("ingredients", recipe.getIngredients()).append("steps", recipe.getSteps()).append("category", recipe.getCategory())
				.append("time", recipe.getTime()).append("difficulty", recipe.getDifficulty()).append("photo", recipe.getPhoto())
				.append("creationDate", recipe.getCreationDate().toString()).append("tags", recipe.getTags());
		
		collection.insertOne(doc);

		recipe.setId(doc.getObjectId("_id").toHexString());
		
		return recipe;
	}

	@Override
	public List<Recipe> findAll() {

		List<Recipe> recipes = new ArrayList<>();

		for (Document doc : collection.find()) {
			recipes.add(toRecipe(doc));
		}

		return recipes;
	}
	@Override
	public Optional<Recipe> findById(String id) {

		ObjectId objectId = new ObjectId(id);

		Document doc = collection.find(eq("_id", objectId)).first();
		if (doc == null) {
			return Optional.empty();
		}

		return Optional.of(toRecipe(doc));
	}


	@Override
	public List<Recipe> findByUser(String userNickname) {
		
		List<Recipe> recipes = new ArrayList<>();

		for (Document doc : collection.find(eq("user", userNickname))) {
			recipes.add(toRecipe(doc));
        }
		
		return recipes;
	}

	@Override
	public List<Recipe> findByFilters(String category, String recipeName) {

		 List<org.bson.conversions.Bson> filters = new ArrayList<>();

	        if (category != null && !category.isBlank()) {
	            filters.add(regex("category", category, "i"));
	        }

	        if (recipeName != null && !recipeName.isBlank()) {
	            filters.add(regex("recipeName", recipeName, "i"));
	        }

	        List<Recipe> results = new ArrayList<>();

	        if (filters.isEmpty()) {
	            for (Document doc : collection.find()) {
	                results.add(toRecipe(doc));
	            }
	        } else if (filters.size() == 1) {
	            for (Document doc : collection.find(filters.get(0))) {
	                results.add(toRecipe(doc));
	            }
	        } else {
	            for (Document doc : collection.find(and(filters))) {
	                results.add(toRecipe(doc));
	            }
	        }

	        return results;
	}
	
	private Recipe toRecipe(Document doc) {
		return new Recipe(doc.getObjectId("_id").toHexString(), doc.getString("user"), doc.getString("recipeName"),
				doc.getList("ingredients", String.class), doc.getString("steps"), doc.getString("category"),
				doc.getInteger("time"), doc.getString("difficulty"), doc.getString("photo"),
				Instant.parse(doc.getString("creationDate")), doc.getList("tags", String.class));
	}



}
