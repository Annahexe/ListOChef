package com.listochef.repository;

import com.listochef.model.RecipeCategory;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * MongoDB implementation of RecipeCategoryRepository.
 * Handles persistence and retrieval of recipe categories from the database.
 */
@Repository
public class MongoRecipeCategoryRepository implements RecipeCategoryRepository {

    private final MongoCollection<Document> collection;

    /**
     * Initializes repository with MongoDB database connection.
     *
     * @param database Mongo database instance
     */
    public MongoRecipeCategoryRepository(MongoDatabase database) {
        this.collection = database.getCollection("recipes_categories");
    }

    /**
     * Retrieves all recipe categories stored in MongoDB.
     *
     * @return list of recipe categories
     */
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