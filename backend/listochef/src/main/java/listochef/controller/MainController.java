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
		
	@GetMapping("/ListOChef/recipeList")
	ResponseEntity<Object> recipeList(){
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		MongoDatabase database = mongoClient.getDatabase("ListOChef");
		MongoCollection<Document> coleccion = database.getCollection("recipes");
		MongoCursor<Document> cursor;
		
		//Into para meter toda la info
		List<Document> list = coleccion.find().into(new ArrayList<>());
		
		return ResponseEntity.status(HttpStatus.OK).body(list);
				}
}
