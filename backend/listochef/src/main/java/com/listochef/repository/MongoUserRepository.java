package com.listochef.repository;

import java.util.ArrayList;
import java.util.Optional;

import org.bson.Document;
import org.springframework.stereotype.Repository;
import com.listochef.model.User;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import static com.mongodb.client.model.Filters.*;

@Repository
public class MongoUserRepository implements UserRepository {


	private final MongoCollection<Document> collection;

	public MongoUserRepository(MongoDatabase database) {
		this.collection = database.getCollection("users");
	}

	private User toUser(Document doc) {
		return new User(doc.getObjectId("_id").toHexString(), doc.getString("email"),
				doc.getString("password"), doc.getString("avatar"), doc.getList("isSaved", String.class));
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
		Document doc = new Document().append("email", user.getEmail())
				.append("password", user.getPassword()).append("avatar", user.getAvatar())
				.append("isSaved", new ArrayList<>());

		collection.insertOne(doc);

		user.setId(doc.getObjectId("_id").toHexString());

		return user;
	}

}
