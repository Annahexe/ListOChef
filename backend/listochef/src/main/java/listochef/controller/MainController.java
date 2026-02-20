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
	static String user;
    
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
	ResponseEntity<Object> recipeList(){

		//Into para meter toda la info
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
	
	@PostMapping("/ListOChef/createUser")
	ResponseEntity<Object> createUser(@RequestBody String data){
		JSONObject jsondata = new JSONObject(data);
		String nickName = jsondata.getString("nickname");
		String email = jsondata.getString("email");
		String password = jsondata.getString("password");
		Bson query = eq("nickname", nickName);
		cursor = usersCollection.find(query).iterator();
		if(cursor.hasNext()) {
			Document doc = new Document();
			doc.append("nickname", nickName);
			doc.append("email",email);
			doc.append("password", password);
			doc.append("avatar", "");
			usersCollection.insertOne(doc);
			return ResponseEntity.status(HttpStatus.OK).build();
		}else {
			System.out.println("Ya existe este usuario en la base de datos");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	@PostMapping("/ListOChef/login")
	ResponseEntity<Object> login(@RequestBody String data){
		JSONObject jsondata = new JSONObject(data);
		String nickName = jsondata.getString("nickname");
		String password = jsondata.getString("password");
		Bson query = and(eq("nickname", nickName), eq("password",password));
		cursor = usersCollection.find(query).iterator();
		if(cursor.hasNext()) {
			user = nickName;
			return ResponseEntity.status(HttpStatus.OK).build();
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
	}
}
