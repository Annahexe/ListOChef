package listochef.controller;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

@RestController
public class MainController {

	MongoClient mongoClient = new MongoClient("localhost", 27017);
	MongoDatabase database = mongoClient.getDatabase("ListOChef");
	MongoCollection<Document> recipesCollection = database.getCollection("recipes");
	MongoCollection<Document> usersCollection = database.getCollection("users");
	MongoCursor<Document> cursor;

	@GetMapping("/ListOChef/recipeList")
	ResponseEntity<Object> recipeList() {

		// Into para meter toda la info
		List<Document> list = recipesCollection.find().into(new ArrayList<>());

		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@PostMapping("/ListOChef/recipeCreate")
	ResponseEntity<Object> recipeCreate(@RequestBody String recipeBody, @RequestParam String userNickname) {

		Bson query = eq("nickname", userNickname);

		cursor = usersCollection.find(query).iterator();

		try {

			if (cursor.hasNext()) {

				JSONObject jsonUser = new JSONObject(recipeBody);
				Document doc = Document.parse(jsonUser.toString());
				recipesCollection.insertOne(doc);

				return ResponseEntity.status(HttpStatus.OK).build();

			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}
		} catch (Exception e) {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}
}
