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

@Repository
public class MongoIngredientRepository implements IngredientRepository {

    private final MongoCollection<Document> collection;

    public MongoIngredientRepository(MongoDatabase database) {
        this.collection = database.getCollection("ingredients");
    }

    @Override
    public Optional<Ingredient> findById(String id) {
        if (id == null || !ObjectId.isValid(id)) return Optional.empty();
        Document doc = collection.find(eq("_id", new ObjectId(id))).first();
        return doc == null ? Optional.empty() : Optional.of(toIngredient(doc));
    }

    @Override
    public List<Ingredient> findAllByIds(List<String> ids) {
        List<Ingredient> result = new ArrayList<>();
        if (ids == null || ids.isEmpty()) return result;

        for (String id : ids) {
            findById(id).ifPresent(result::add);
        }

        return result;
    }

    @Override
    public List<Ingredient> findAll() {
        List<Ingredient> result = new ArrayList<>();
        List<Document> docs = collection.find().into(new ArrayList<>());

        for (Document doc : docs) {
            result.add(toIngredient(doc));
        }

        return result;
    }

    private Ingredient toIngredient(Document doc) {
        return new Ingredient(
            doc.getObjectId("_id").toHexString(),
            doc.getString("name"),
            doc.getString("category")
        );
    }
}