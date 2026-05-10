package com.listochef.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import java.time.Instant;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import com.listochef.model.Recipe;
import com.listochef.model.User;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

/**
 * MongoDB implementation of RecipeRepository.
 *
 * This class handles all recipe-related persistence logic using the "recipes"
 * collection, including saving, searching, filtering, and managing
 * user-specific saved recipes state.
 */
@Repository
public class MongoRecipeRepository implements RecipeRepository {

	private final MongoCollection<Document> collection;
	private final MongoUserRepository mongoUserRepo;

	/**
	 * Constructor of MongoRecipeRepository.
	 *
	 * @param database      MongoDB database instance.
	 * @param mongoUserRepo User repository used for cross-referencing saved
	 *                      recipes.
	 */
	public MongoRecipeRepository(MongoDatabase database, MongoUserRepository mongoUserRepo) {
		this.collection = database.getCollection("recipes");
		this.mongoUserRepo = mongoUserRepo;
	}

	/**
	 * Saves a new recipe in MongoDB and associates it with a user.
	 *
	 * Steps: - Converts Recipe object into MongoDB document - Inserts it into the
	 * "recipes" collection - Assigns generated ID back to the recipe - Adds recipe
	 * to user's saved list
	 *
	 * @param recipe Recipe to save.
	 * @param email  User email.
	 * @return Saved Recipe with generated ID.
	 */
	@Override
	public Recipe save(Recipe recipe, String email) {

		Document doc = new Document().append("recipeName", recipe.getRecipeName())
				.append("ingredients", recipe.getIngredients()).append("steps", recipe.getSteps())
				.append("category", recipe.getCategory()).append("time", recipe.getTime())
				.append("difficulty", recipe.getDifficulty()).append("photo", recipe.getPhoto())
				.append("creationDate", recipe.getCreationDate().toString()).append("tags", recipe.getTags());

		collection.insertOne(doc);

		recipe.setId(doc.getObjectId("_id").toHexString());

		mongoUserRepo.addToRecipesSaved(email, recipe.getId());

		return recipe;
	}

	/**
	 * Retrieves all recipes and marks those saved by the user.
	 *
	 * @param email User email.
	 * @return List of recipes with saved flag.
	 */
	@Override
	public List<Recipe> findAll(String email) {

		List<Recipe> recipes = new ArrayList<>();
		List<String> savedIds = getAllRecipesSavedIds(email);

		for (Document doc : collection.find()) {
			Recipe auxRecipe = toRecipe(doc);
			markAsSaved(auxRecipe, savedIds);
			recipes.add(auxRecipe);
		}

		return recipes;
	}

	/**
	 * Finds a recipe by ID and marks it as saved if applicable.
	 *
	 * @param id    Recipe ID.
	 * @param email User email.
	 * @return Optional Recipe.
	 */
	@Override
	public Optional<Recipe> findById(String id, String email) {

		if (id == null || !ObjectId.isValid(id)) {
			return Optional.empty();
		}

		try {
			ObjectId objectId = new ObjectId(id);
			Document doc = collection.find(eq("_id", objectId)).first();

			if (doc == null) {
				return Optional.empty();
			}

			List<String> savedIds = getAllRecipesSavedIds(email);

			Recipe auxRecipe = toRecipe(doc);
			markAsSaved(auxRecipe, savedIds);

			return Optional.of(auxRecipe);

		} catch (IllegalArgumentException e) {
			System.err.println("Error converting ID: " + id);
			return Optional.empty();
		}
	}

	/**
	 * Retrieves recipes filtered by category and/or name.
	 *
	 * @param category   Category filter.
	 * @param recipeName Name filter.
	 * @param email      User email.
	 * @return List of filtered recipes.
	 */
	@Override
	public List<Recipe> findByFilters(String category, String recipeName, String email) {

		List<org.bson.conversions.Bson> filters = new ArrayList<>();

		if (category != null && !category.isBlank()) {
			filters.add(regex("category", category, "i"));
		}

		if (recipeName != null && !recipeName.isBlank()) {
			filters.add(regex("recipeName", recipeName, "i"));
		}

		List<String> savedIds = getAllRecipesSavedIds(email);

		List<Recipe> results = new ArrayList<>();
		Iterable<Document> docs;

		if (filters.isEmpty()) {
			docs = collection.find();
		} else if (filters.size() == 1) {
			docs = collection.find(filters.get(0));
		} else {
			docs = collection.find(and(filters));
		}

		for (Document doc : docs) {
			Recipe auxRecipe = toRecipe(doc);
			markAsSaved(auxRecipe, savedIds);
			results.add(auxRecipe);
		}

		return results;
	}

	/**
	 * Retrieves all recipes saved by a user.
	 *
	 * @param email User email.
	 * @return List of saved recipes.
	 */
	public List<Recipe> getUserRecipesSaved(String email) {

		List<Recipe> userRecipesSavedList = new ArrayList<>();

		Optional<User> userOpt = mongoUserRepo.findByEmail(email);

		if (userOpt.isEmpty()) {
			return userRecipesSavedList;
		}

		List<String> userRecipesSaved = userOpt.get().getRecipesSavedIds();

		if (userRecipesSaved == null || userRecipesSaved.isEmpty()) {
			return userRecipesSavedList;
		}

		for (String recipeId : userRecipesSaved) {
			Optional<Recipe> recipeOpt = findById(recipeId, email);

			if (recipeOpt.isPresent()) {
				userRecipesSavedList.add(recipeOpt.get());
			}
		}

		return userRecipesSavedList;
	}

	/**
	 * Converts MongoDB document into Recipe object.
	 *
	 * @param doc MongoDB document.
	 * @return Recipe instance.
	 */
	private Recipe toRecipe(Document doc) {
		return new Recipe(doc.getObjectId("_id").toHexString(), doc.getString("recipeName"),
				doc.getList("ingredients", String.class), doc.getString("steps"), doc.getString("category"),
				doc.getInteger("time"), doc.getString("difficulty"), doc.getString("photo"),
				Instant.parse(doc.getString("creationDate")), doc.getList("tags", String.class));
	}

	/**
	 * Marks a recipe as saved if its ID is in the user's saved list.
	 *
	 * @param recipe   Recipe object.
	 * @param savedIds List of saved recipe IDs.
	 * @return Updated recipe.
	 */
	private Recipe markAsSaved(Recipe recipe, List<String> savedIds) {

		if (savedIds != null && savedIds.contains(recipe.getId())) {
			recipe.setSaved(true);
		}

		return recipe;
	}

	/**
	 * Retrieves all saved recipe IDs for a user.
	 *
	 * @param email User email.
	 * @return List of recipe IDs.
	 */
	private List<String> getAllRecipesSavedIds(String email) {

		Optional<User> userOpt = mongoUserRepo.findByEmail(email);

		List<String> savedIds = new ArrayList<>();

		if (userOpt.isPresent() && userOpt.get().getRecipesSavedIds() != null) {
			savedIds = userOpt.get().getRecipesSavedIds();
		}

		return savedIds;
	}
}