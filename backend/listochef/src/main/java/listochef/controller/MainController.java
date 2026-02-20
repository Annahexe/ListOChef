package listochef.controller;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

@RestController
public class MainController {
	
    //  rodri
    @GetMapping(value = "/ListOChef/recipeList", params = {"type", "!recipeName"})
    public ResponseEntity<Object> recipeListByType(@RequestParam String type) {
        return filterByTypeAndOrName(type, null);
    }

    @GetMapping(value = "/ListOChef/recipeList", params = {"!type", "recipeName"})
    public ResponseEntity<Object> recipeListByName(@RequestParam String recipeName) {
        return filterByTypeAndOrName(null, recipeName);
    }

    @GetMapping(value = "/ListOChef/recipeList", params = {"type", "recipeName"})
    public ResponseEntity<Object> recipeListByTypeAndName(
            @RequestParam String type,
            @RequestParam String recipeName
    ) {
        return filterByTypeAndOrName(type, recipeName);
    }

    private ResponseEntity<Object> filterByTypeAndOrName(String type, String recipeName) {

        MongoClient mongoClient = new MongoClient("localhost", 27017);
        MongoDatabase database = mongoClient.getDatabase("ListOChef");
        MongoCollection<Document> coleccion = database.getCollection("recipes");

        List<Bson> filters = new ArrayList<>();

        if (type != null && !type.trim().isEmpty()) {
            String regexType = "(^|,\\s*)" + java.util.regex.Pattern.quote(type.trim()) + "(\\s*,|$)";
            filters.add(regex("type", regexType, "i"));
        }

        if (recipeName != null && !recipeName.trim().isEmpty()) {
            filters.add(regex("recipeName",
                    java.util.regex.Pattern.quote(recipeName.trim()), "i"));
        }

        List<Document> results;

        if (filters.isEmpty()) {
            results = coleccion.find().into(new ArrayList<>());
        } else if (filters.size() == 1) {
            results = coleccion.find(filters.get(0)).into(new ArrayList<>());
        } else {
            results = coleccion.find(and(filters)).into(new ArrayList<>());
        }

        List<Document> recipes = new ArrayList<>();

        for (Document doc : results) {
            Document r = new Document();
            r.append("id", doc.getObjectId("_id").toString());
            r.append("recipeName", doc.getString("recipeName"));
            r.append("type", doc.getString("type"));
            r.append("time", doc.get("time"));
            r.append("difficulty", doc.getString("difficulty"));
            r.append("photo", doc.getString("photo"));
            r.append("isSaved", doc.getBoolean("isSaved"));
            recipes.add(r);
        }

        Document response = new Document("recipes", recipes);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}