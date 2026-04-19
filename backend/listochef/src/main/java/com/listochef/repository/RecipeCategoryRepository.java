package com.listochef.repository;

import com.listochef.model.RecipeCategory;
import java.util.List;

public interface RecipeCategoryRepository {
    List<RecipeCategory> findAll();
}