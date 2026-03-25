package com.listochef.repository;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.stereotype.Repository;

import com.listochef.model.IngredientCategory;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Repository
public class MongoIngredientCategoryRepository implements IngredientCategoryRepository{

    private final MongoCollection<Document> collection;

    public MongoIngredientCategoryRepository(MongoDatabase database) {
        this.collection = database.getCollection("ingredients_categories");
    }
    
	@Override
	public List<IngredientCategory> getAllIngredientsCategories() {
		
	    List<IngredientCategory> ingredientsCategories = new ArrayList<>();

	    for (Document doc : collection.find()) {
	    	IngredientCategory ingredientCategory = toIngredientCategory(doc);
	    	ingredientsCategories.add(ingredientCategory);
	    }
		return ingredientsCategories;
	}
	
	private IngredientCategory toIngredientCategory(Document doc) {
		return new IngredientCategory(doc.getObjectId("_id").toHexString(), 
										doc.getString("name"),
										doc.getString("icon"));
	}

}
