package com.listochef.repository;

import java.util.ArrayList;
import java.util.Optional;

import org.bson.Document;
import org.springframework.stereotype.Repository;
import com.listochef.model.User;
import com.listochef.model.UserIngredient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;

@Repository
public class MongoUserRepository implements UserRepository {


	private final MongoCollection<Document> collection;

	public MongoUserRepository(MongoDatabase database) {
		this.collection = database.getCollection("users");
	}

	private User toUser(Document doc) {
		ArrayList<UserIngredient> myGroceryList = new ArrayList<>();
		ArrayList<UserIngredient> myPantryList = new ArrayList<>();

		ArrayList<Document> groceryDocs = (ArrayList<Document>) doc.get("myGroceryList");
		if (groceryDocs != null) {
			for (Document ingredientDoc : groceryDocs) {
				UserIngredient ingredient = new UserIngredient();
				ingredient.setIngredientName(ingredientDoc.getString("ingredientName"));
				ingredient.setIngredientTag(ingredientDoc.getString("ingredientTag"));
				ingredient.setIngredientAmount(ingredientDoc.getString("ingredientAmount"));
				myGroceryList.add(ingredient);
			}
		}

		ArrayList<Document> pantryDocs = (ArrayList<Document>) doc.get("myPantryList");
		if (pantryDocs != null) {
			for (Document ingredientDoc : pantryDocs) {
				UserIngredient ingredient = new UserIngredient();
				ingredient.setIngredientName(ingredientDoc.getString("ingredientName"));
				ingredient.setIngredientTag(ingredientDoc.getString("ingredientTag"));
				ingredient.setIngredientAmount(ingredientDoc.getString("ingredientAmount"));
				myPantryList.add(ingredient);
			}
		}

		return new User(
			doc.getObjectId("_id").toHexString(),
			doc.getString("name"),
			doc.getString("surname"),
			doc.getString("email"),
			doc.getString("password"),
			doc.getString("avatar"),
			doc.getList("recipesSavedIds", String.class),
			myGroceryList,
			myPantryList
		);
	}

	@Override
	public Optional<User> findByEmail(String email) {
		Document doc = collection.find(eq("email", email)).first();

		if (doc == null) {
			return Optional.empty();			
		}

		return Optional.of(toUser(doc));
	}

	@Override
	public User register(User user) {
		Document doc = new Document()
				.append("name", user.getName())
				.append("surname", user.getSurname())
				.append("email", user.getEmail())
				.append("password", user.getPassword())
				.append("avatar", user.getAvatar())
				.append("recipesSavedIds", new ArrayList<>())
				.append("myGroceryList", new ArrayList<>())
				.append("myPantryList", new ArrayList<>());

		collection.insertOne(doc);

		user.setId(doc.getObjectId("_id").toHexString());

		return user;
	}
	
	@Override
	public User setPassword(User user) {
	    collection.updateOne(
	        eq("email", user.getEmail()),
	        set("password", user.getPassword())
	    );
	    return user;
	}

	@Override
	public void addToRecipesSaved(String email, String recipeId) {
	    collection.updateOne(
	        eq("email", email),
	        addToSet("recipesSavedIds", recipeId)
	    );
	}
	
	@Override
	public UpdateResult deleteFromRecipesSaved(String email, String recipeId) {
		 return collection.updateOne(
			    eq("email", email),
			    pull("recipesSavedIds", recipeId)
			);
	}

	
	@Override
	public User editProfile(User user) {
	    collection.updateOne(
	        eq("email", user.getEmail()),
	        combine(
	            set("name", user.getName()),
	            set("surname", user.getSurname()),
	            set("password", user.getPassword())
	        )
	    );
	    return user;
	}
	
    @Override
    public void removeFromGroceryList(String email, String ingredientName) {
        collection.updateOne(
            eq("email", email),
            pull("myGroceryList", new Document("ingredientName", ingredientName))
        );
    }

    @Override
    public void removeFromPantryList(String email, String ingredientName) {
        collection.updateOne(
            eq("email", email),
            pull("myPantryList", new Document("ingredientName", ingredientName))
        );
    }
}
