package com.listochef.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;
import com.listochef.model.User;
import com.listochef.model.UserIngredient;
import com.listochef.model.UserTicket;
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
		ArrayList<UserTicket> myTicketsList = new ArrayList<>();

		ArrayList<Document> groceryDocs = (ArrayList<Document>) doc.get("myGroceryList");
		if (groceryDocs != null) {
			for (Document ingredientDoc : groceryDocs) {
				UserIngredient ingredient = new UserIngredient();
				ingredient.setIngredientName(ingredientDoc.getString("ingredientName"));
				ingredient.setIngredientTag(ingredientDoc.getString("ingredientTag"));
				ingredient.setIngredientAmount(ingredientDoc.getInteger("ingredientAmount"));
				myGroceryList.add(ingredient);
			}
		}

		ArrayList<Document> pantryDocs = (ArrayList<Document>) doc.get("myPantryList");
		if (pantryDocs != null) {
			for (Document ingredientDoc : pantryDocs) {
				UserIngredient ingredient = new UserIngredient();
				ingredient.setIngredientName(ingredientDoc.getString("ingredientName"));
				ingredient.setIngredientTag(ingredientDoc.getString("ingredientTag"));
				ingredient.setIngredientAmount(ingredientDoc.getInteger("ingredientAmount"));
				myPantryList.add(ingredient);
			}
		}

		ArrayList<Document> ticketsDocs = (ArrayList<Document>) doc.get("myTicketsList");
		if (ticketsDocs != null) {
			for (Document ticketDoc : ticketsDocs) {
				UserTicket ticket = new UserTicket();
				ticket.setId(ticketDoc.getObjectId("_id").toHexString());
				ticket.setTicketPictureUri(ticketDoc.getString("ticketPictureUri"));
				ticket.setTicketPicturePublicId(ticketDoc.getString("ticketPicturePublicId"));
				ticket.setSupermarket(ticketDoc.getString("supermarket"));
				ticket.setTicketDate(ticketDoc.getDate("ticketDate"));
				ticket.setAmountProducts(ticketDoc.getInteger("amountProducts"));
				ticket.setTotalPrice(ticketDoc.getDouble("totalPrice"));
				myTicketsList.add(ticket);
			}
		}
		
		String role = doc.getString("role");
		
		if (role == null) {
		    role = "user";
		}

		return new User(doc.getObjectId("_id").toHexString(), doc.getString("name"), doc.getString("surname"),
				doc.getString("email"), doc.getString("password"), doc.getString("avatar"),
				doc.getList("recipesSavedIds", String.class), myGroceryList, myPantryList, myTicketsList, role);
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
		Document doc = new Document().append("name", user.getName()).append("surname", user.getSurname())
				.append("email", user.getEmail()).append("password", user.getPassword())
				.append("avatar", user.getAvatar()).append("recipesSavedIds", new ArrayList<>())
				.append("myGroceryList", new ArrayList<>()).append("myPantryList", new ArrayList<>())
				.append("myTicketsList", new ArrayList<>()).append("role", "user");

		collection.insertOne(doc);

		user.setId(doc.getObjectId("_id").toHexString());

		return user;
	}

	@Override
	public User setPassword(User user) {
		collection.updateOne(eq("email", user.getEmail()), set("password", user.getPassword()));
		return user;
	}

	@Override
	public void addToRecipesSaved(String email, String recipeId) {
		collection.updateOne(eq("email", email), addToSet("recipesSavedIds", recipeId));
	}

	@Override
	public UpdateResult deleteFromRecipesSaved(String email, String recipeId) {
		return collection.updateOne(eq("email", email), pull("recipesSavedIds", recipeId));
	}

	@Override
	public User editProfile(User user) {
		collection.updateOne(eq("email", user.getEmail()), combine(set("name", user.getName()),
				set("surname", user.getSurname()), set("password", user.getPassword())));
		return user;
	}

	@Override
	public void removeFromGroceryList(String email, String ingredientName) {
		collection.updateOne(eq("email", email), pull("myGroceryList", new Document("ingredientName", ingredientName)));
	}

	@Override
	public void updatePantryList(String email, List<UserIngredient> userIngredients) {
		List<Document> pantryDocs = userIngredients.stream()
				.map(i -> new Document().append("ingredientName", i.getIngredientName())
						.append("ingredientAmount", i.getIngredientAmount())
						.append("ingredientTag", i.getIngredientTag()))
				.toList();
		collection.updateOne(eq("email", email), set("myPantryList", pantryDocs));
	}

	@Override
	public void removeFromPantryList(String email, String ingredientName) {
		collection.updateOne(eq("email", email), pull("myPantryList", new Document("ingredientName", ingredientName)));
	}

	@Override
	public void updateGroceryList(String email, List<UserIngredient> ingredients) {
		if (ingredients == null || ingredients.isEmpty()) {
			return;
		}

		for (UserIngredient ingredient : ingredients) {
			if (ingredient.getIngredientName() == null || ingredient.getIngredientName().isBlank()) {
				continue;
			}

			collection.updateOne(eq("email", email),
					pull("myGroceryList", new Document("ingredientName", ingredient.getIngredientName())));

			if (ingredient.getIngredientAmount() == 0) {
				continue;
			}

			Document ingredientDoc = new Document().append("ingredientName", ingredient.getIngredientName())
					.append("ingredientTag", ingredient.getIngredientTag())
					.append("ingredientAmount", ingredient.getIngredientAmount());

			collection.updateOne(eq("email", email), push("myGroceryList", ingredientDoc));
		}
	}

	@Override
	public UserTicket createTicket(String email, UserTicket newTicket) {

		ObjectId id = new ObjectId();

		newTicket.setId(id.toHexString());

		Document newTicketDoc = new Document().append("_id", id)
				.append("ticketPictureUri", newTicket.getTicketPictureUri())
				.append("ticketPicturePublicId", newTicket.getTicketPicturePublicId())
				.append("supermarket", newTicket.getSupermarket()).append("ticketDate", newTicket.getTicketDate())
				.append("amountProducts", newTicket.getAmountProducts())
				.append("totalPrice", newTicket.getTotalPrice());

		collection.updateOne(eq("email", email), push("myTicketsList", newTicketDoc));

		return newTicket;
	}

	@Override
	public void deleteTicket(String email, String ticketId) {
		collection.updateOne(eq("email", email), pull("myTicketsList", eq("_id", new ObjectId(ticketId))));
	}

	@Override
	public UserTicket findTicketById(String email, String ticketId) {

		Document userDoc = collection.find(eq("email", email)).first();

		if (userDoc == null) {
			return null;
		}

		List<Document> tickets = (List<Document>) userDoc.get("myTicketsList");

		if (tickets == null) {
			return null;
		}

		for (Document ticketDoc : tickets) {

			ObjectId id = ticketDoc.getObjectId("_id");

			if (id != null && id.toHexString().equals(ticketId)) {

				UserTicket ticket = new UserTicket();

				ticket.setId(id.toHexString());
				ticket.setTicketPictureUri(ticketDoc.getString("ticketPictureUri"));

				ticket.setTicketPicturePublicId(ticketDoc.getString("ticketPicturePublicId"));
				ticket.setSupermarket(ticketDoc.getString("supermarket"));
				ticket.setTicketDate(ticketDoc.getDate("ticketDate"));
				ticket.setAmountProducts(ticketDoc.getInteger("amountProducts"));
				ticket.setTotalPrice(ticketDoc.getDouble("totalPrice"));
				return ticket;
			}
		}

		return null;
	}
	
	@Override
	public void deleteUser(String userId) {
	    collection.deleteOne(eq("_id", new ObjectId(userId)));
	}

}
