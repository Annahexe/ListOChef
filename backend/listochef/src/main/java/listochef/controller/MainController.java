package listochef.controller;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.MongoClient;
//import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;

@RestController
public class MainController {

	
	private final MongoCollection<Document> recipesCollection;
    private final MongoCollection<Document> usersCollection;
    

    public MainController(MongoClient mongoClient) {
        MongoDatabase database = mongoClient.getDatabase("ListOChef");
        this.recipesCollection = database.getCollection("recipes");
        this.usersCollection = database.getCollection("users");
        
    }
	MongoCursor<Document> cursor;
	Bson query;
	

	@GetMapping(value = "/ListOChef/recipeList", params = { "type", "!recipeName" })
	public ResponseEntity<Object> recipeListByType(@RequestParam String type) {
		return filterByTypeAndOrName(type, null);
	}

	@GetMapping(value = "/ListOChef/recipeList", params = { "!type", "recipeName" })
	public ResponseEntity<Object> recipeListByName(@RequestParam String recipeName) {
		return filterByTypeAndOrName(null, recipeName);
	}

	@GetMapping(value = "/ListOChef/recipeList", params = { "type", "recipeName" })
	public ResponseEntity<Object> recipeListByTypeAndName(@RequestParam String type, @RequestParam String recipeName) {
		return filterByTypeAndOrName(type, recipeName);
	}

	private ResponseEntity<Object> filterByTypeAndOrName(String type, String recipeName) {

		List<Bson> filters = new ArrayList<>();

		if (type != null && !type.trim().isEmpty()) {
			String regexType = "(^|,\\s*)" + java.util.regex.Pattern.quote(type.trim()) + "(\\s*,|$)";
			filters.add(regex("type", regexType, "i"));
		}

		if (recipeName != null && !recipeName.trim().isEmpty()) {
			filters.add(regex("recipeName", java.util.regex.Pattern.quote(recipeName.trim()), "i"));
		}

		List<Document> results;

		if (filters.isEmpty()) {
			results = recipesCollection.find().into(new ArrayList<>());
		} else if (filters.size() == 1) {
			results = recipesCollection.find(filters.get(0)).into(new ArrayList<>());
		} else {
			results = recipesCollection.find(and(filters)).into(new ArrayList<>());
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

	@GetMapping("/ListOChef/recipeList")
	ResponseEntity<Object> recipeList() {

		// Into para meter toda la info
		List<Document> list = recipesCollection.find().into(new ArrayList<>());
		List<Document> recipes = new ArrayList<>();
		for (Document doc : list) {
			Document r = new Document();
			r.append("id", doc.getObjectId("_id").toString());
			r.append("recipeName", doc.getString("recipeName"));
			r.append("type", doc.getString("type"));
			r.append("time", doc.get("time"));
			r.append("difficulty", doc.getString("difficulty"));
			r.append("photo", doc.getString("photo"));
			recipes.add(r);
		}

		Document response = new Document("recipes", recipes);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@GetMapping("/ListOChef/recipesUser")
	ResponseEntity<Object> recipesUser(@RequestParam(value = "email") String email) {
		query = eq("email", email);
		// Into para meter toda la info
		cursor = usersCollection.find(query).iterator();
		if (cursor.hasNext()) {
			
			Document userDoc = cursor.next();
			List<String> ids = userDoc.getList("isSaved", String.class);
			List<ObjectId> objectsIds = new ArrayList<>();
			for(String id : ids) {
				objectsIds.add(new ObjectId(id));
			}
			
				query = in("_id",objectsIds);
				List<Document> recipes = new ArrayList<>();
				cursor = recipesCollection.find(query).iterator();
				while(cursor.hasNext()) {
					recipes.add(cursor.next());
				}
				if(recipes.isEmpty()) {
					return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No hay resultados");
				}
				return ResponseEntity.status(HttpStatus.OK).body(recipes);
			}
		
// Posible mejor de calidad visual
//		for (Document doc : list) {
//            Document r = new Document();
//            r.append("id", doc.getObjectId("_id").toString());
//            r.append("recipeName", doc.getString("recipeName"));
//            r.append("type", doc.getString("type"));
//            r.append("time", doc.get("time"));
//            r.append("difficulty", doc.getString("difficulty"));
//            r.append("photo", doc.getString("photo"));
//            recipes.add(r);
//        }

//		Document response = new Document("recipes", recipes);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	@PostMapping("/ListOChef/recipeCreate")
	ResponseEntity<Object> recipeCreate(@RequestBody String recipeBody, @RequestParam String email) {

		Bson query = eq("email", email);

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

	@PostMapping("/ListOChef/createUser")
	ResponseEntity<Object> createUser(@RequestBody String data) {
		JSONObject jsondata = new JSONObject(data);
		String email = jsondata.getString("email");
		String password = jsondata.getString("password");
		List<String> recipes = new ArrayList<>();
		Bson query = eq("email", email);
		cursor = usersCollection.find(query).iterator();
		try {
			if (!cursor.hasNext()) {
				Document doc = new Document();
				doc.append("email", email);
				doc.append("password", password);
				doc.append("avatar", "");
				doc.append("isSaved", recipes);
				usersCollection.insertOne(doc);
				return ResponseEntity.status(HttpStatus.OK).build();
			} else {
				System.out.println("Ya existe este usuario en la base de datos");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
			}
		} catch (Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}

	}

	@PostMapping("/ListOChef/login")
	ResponseEntity<Object> login(@RequestBody String data) {
		JSONObject jsondata = new JSONObject(data);
		String email = jsondata.getString("email");
		String password = jsondata.getString("password");
		Bson query = and(eq("email", email), eq("password", password));
		cursor = usersCollection.find(query).iterator();
		if (cursor.hasNext()) {
			return ResponseEntity.status(HttpStatus.OK).build();
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

	}
}
