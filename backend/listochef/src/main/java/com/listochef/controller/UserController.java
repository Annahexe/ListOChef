package com.listochef.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.listochef.model.User;
import com.listochef.model.UserIngredient;
import com.listochef.model.UserTicket;
import com.listochef.service.UserService;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;
import com.listochef.model.UserIngredient;

@RestController
@RequestMapping("/ListOChef")
public class UserController {

	private final UserService service;
	private final ObjectMapper mapper;

	public UserController(UserService service, ObjectMapper mapper) {
		this.service = service;
		this.mapper = mapper;
	}

	@PostMapping("/register")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		service.register(user);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/forgotPassword")
	public ResponseEntity<Void> forgotPassword(@RequestBody Map<String, String> body) {
		service.forgotPassword(body.get("email"));
		return ResponseEntity.ok().build();
	}

	@PostMapping("/resetPassword")
	public ResponseEntity<Void> resetPassword(@RequestBody Map<String, String> body) {
		service.resetPassword(body.get("email"), body.get("code"), body.get("newPassword"));
		return ResponseEntity.ok().build();
	}

	@PostMapping("/changePassword")
	public ResponseEntity<Void> changePassword(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {

		service.changePassword(email, body.get("currentPassword"), body.get("newPassword"));
		return ResponseEntity.ok().build();
	}

	@PostMapping("/editProfile")
	public ResponseEntity<Void> editProfile(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {
		service.editProfile(email, body);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/toggleSaved")
	public ResponseEntity<String> toggleRecipeSaved(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {
		boolean saved = service.toggleRecipeSaved(email, body.get("recipeId"));
		return ResponseEntity.ok().body("saved:" + saved);
	}

	@PostMapping("/removeFromGroceryList")
	public ResponseEntity<Void> removeFromGroceryList(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {
		service.removeFromGroceryList(email, body.get("ingredientName"));
		return ResponseEntity.ok().build();
	}

	@PostMapping("/updatePantryList")
	public ResponseEntity<Void> removeFromPantryList(@RequestBody List<UserIngredient> body,
			@AuthenticationPrincipal String email) {
		service.updatePantryList(email, body);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/updateGroceryList")
	public ResponseEntity<Void> updateGroceryList(@RequestBody List<UserIngredient> ingredients,
			@AuthenticationPrincipal String email) {

		service.updateGroceryList(email, ingredients);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/removeFromPantryList")
	public ResponseEntity<Void> removeFromPantryList(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {
		service.removeFromPantryList(email, body.get("ingredientName"));
		return ResponseEntity.ok().build();
	}

	@PostMapping(value = "/createTicket", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<UserTicket> createTicket(@RequestPart("ticket") String ticketJson,
			@RequestPart(value = "photo", required = false) MultipartFile photo, @AuthenticationPrincipal String email)
			throws Exception {
		UserTicket ticket = mapper.readValue(ticketJson, UserTicket.class);

		UserTicket created = service.createTicket(email, ticket, photo);

		return ResponseEntity.ok(created);
	}
	
	@PostMapping(value = "/deleteTicket/{ticketId}")
	public ResponseEntity<Void> deleteTicket(@PathVariable String ticketId,
	                                          @AuthenticationPrincipal String email) {
	    service.deleteTicket(email, ticketId);
	    return ResponseEntity.noContent().build();
	}

}
