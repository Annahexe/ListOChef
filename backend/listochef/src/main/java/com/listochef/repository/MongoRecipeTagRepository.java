package com.listochef.repository;

import com.listochef.model.RecipeTag;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MongoRecipeTagRepository implements RecipeTagRepository {

    private final MongoCollection<Document> collection;

    public MongoRecipeTagRepository(MongoDatabase database) {
        this.collection = database.getCollection("recipe_tags");
    }

    @Override
    public List<RecipeTag> findAll() {
        List<RecipeTag> tags = new ArrayList<>();
        for (Document doc : collection.find()) {
            tags.add(new RecipeTag(
                doc.getObjectId("_id").toHexString(),
                doc.getString("name")
            ));
        }
        return tags;
    }
}