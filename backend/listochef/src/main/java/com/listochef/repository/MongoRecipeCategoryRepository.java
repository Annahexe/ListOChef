package com.listochef.repository;

import com.listochef.model.RecipeCategory;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MongoRecipeCategoryRepository implements RecipeCategoryRepository {

    private final MongoCollection<Document> collection;

    public MongoRecipeCategoryRepository(MongoDatabase database) {
        this.collection = database.getCollection("recipe_categories");
    }

    @Override
    public List<RecipeCategory> findAll() {
        List<RecipeCategory> categories = new ArrayList<>();
        for (Document doc : collection.find()) {
            categories.add(new RecipeCategory(
                doc.getObjectId("_id").toHexString(),
                doc.getString("name"),
                doc.getString("description")
            ));
        }
        return categories;
    }
}