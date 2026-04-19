package com.listochef.repository;

import com.listochef.model.RecipeTag;
import java.util.List;

public interface RecipeTagRepository {
    List<RecipeTag> findAll();
}