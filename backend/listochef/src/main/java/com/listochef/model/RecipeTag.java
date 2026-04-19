package com.listochef.model;

import org.bson.types.ObjectId;

public class RecipeTag {
    private String id;
    private String name;

    public RecipeTag() {}

    public RecipeTag(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}