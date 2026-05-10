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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;
import com.listochef.model.UserIngredient;

/**
 * Controller responsible for managing user-related operations.
 *
 * This includes user registration, profile management, password recovery,
 * pantry and grocery list management, recipe saving, and ticket handling.
 *
 * Base URL: /ListOChef
 */
@RestController
@RequestMapping("/ListOChef")
public class UserController {

	private final UserService service;
	private final ObjectMapper mapper;

	/**
	 * Constructor of the UserController.
	 *
	 * @param service Service responsible for user business logic.
	 * @param mapper  Object used to map JSON to Java objects.
	 */
	public UserController(UserService service, ObjectMapper mapper) {
		this.service = service;
		this.mapper = mapper;
	}

	/**
	 * Registers a new user in the system.
	 *
	 * Endpoint: POST /register
	 *
	 * @param user User object containing registration data.
	 */
	@PostMapping("/register")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		service.register(user);
		return ResponseEntity.ok().build();
	}

	/**
	 * Sends a password recovery code to the user's email.
	 *
	 * Endpoint: POST /forgotPassword
	 *
	 * @param body Request body containing the email.
	 */
	@PostMapping("/forgotPassword")
	public ResponseEntity<Void> forgotPassword(@RequestBody Map<String, String> body) {
		service.forgotPassword(body.get("email"));
		return ResponseEntity.ok().build();
	}

	/**
	 * Resets the user's password using a verification code.
	 *
	 * Endpoint: POST /resetPassword
	 *
	 * @param body Request body containing email, code, and new password.
	 */
	@PostMapping("/resetPassword")
	public ResponseEntity<Void> resetPassword(@RequestBody Map<String, String> body) {
		service.resetPassword(body.get("email"), body.get("code"), body.get("newPassword"));
		return ResponseEntity.ok().build();
	}

	/**
	 * Changes the password of the authenticated user.
	 *
	 * Endpoint: POST /changePassword
	 *
	 * @param body  Request body containing current and new password.
	 * @param email Authenticated user email.
	 */
	@PostMapping("/changePassword")
	public ResponseEntity<Void> changePassword(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {

		service.changePassword(email, body.get("currentPassword"), body.get("newPassword"));
		return ResponseEntity.ok().build();
	}

	/**
	 * Edits the profile of the authenticated user.
	 *
	 * Endpoint: POST /editProfile
	 *
	 * @param body  Request body containing profile data.
	 * @param email Authenticated user email.
	 */
	@PostMapping("/editProfile")
	public ResponseEntity<Void> editProfile(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {

		service.editProfile(email, body);
		return ResponseEntity.ok().build();
	}

	/**
	 * Toggles saving/un-saving a recipe for the user.
	 *
	 * Endpoint: POST /toggleSaved
	 *
	 * @param body  Request body containing recipeId.
	 * @param email Authenticated user email.
	 */
	@PostMapping("/toggleSaved")
	public ResponseEntity<String> toggleRecipeSaved(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {

		boolean saved = service.toggleRecipeSaved(email, body.get("recipeId"));
		return ResponseEntity.ok().body("saved:" + saved);
	}

	/**
	 * Removes an ingredient from the user's grocery list.
	 *
	 * Endpoint: POST /removeFromGroceryList
	 *
	 * @param body  Request body containing ingredientName.
	 * @param email Authenticated user email.
	 */
	@PostMapping("/removeFromGroceryList")
	public ResponseEntity<Void> removeFromGroceryList(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {

		service.removeFromGroceryList(email, body.get("ingredientName"));
		return ResponseEntity.ok().build();
	}

	/**
	 * Updates the user's pantry list.
	 *
	 * Endpoint: POST /updatePantryList
	 *
	 * @param body  List of ingredients.
	 * @param email Authenticated user email.
	 */
	@PostMapping("/updatePantryList")
	public ResponseEntity<Void> updatePantryList(@RequestBody List<UserIngredient> body,
			@AuthenticationPrincipal String email) {

		service.updatePantryList(email, body);
		return ResponseEntity.ok().build();
	}

	/**
	 * Updates the user's grocery list.
	 *
	 * Endpoint: POST /updateGroceryList
	 *
	 * @param ingredients List of ingredients.
	 * @param email       Authenticated user email.
	 */
	@PostMapping("/updateGroceryList")
	public ResponseEntity<Void> updateGroceryList(@RequestBody List<UserIngredient> ingredients,
			@AuthenticationPrincipal String email) {

		service.updateGroceryList(email, ingredients);
		return ResponseEntity.ok().build();
	}

	/**
	 * Removes an ingredient from the pantry list.
	 *
	 * Endpoint: POST /removeFromPantryList
	 *
	 * @param body  Request body containing ingredientName.
	 * @param email Authenticated user email.
	 */
	@PostMapping("/removeFromPantryList")
	public ResponseEntity<Void> removeFromPantryList(@RequestBody Map<String, String> body,
			@AuthenticationPrincipal String email) {

		service.removeFromPantryList(email, body.get("ingredientName"));
		return ResponseEntity.ok().build();
	}

	/**
	 * Creates a support ticket for the user.
	 *
	 * Endpoint: POST /createTicket
	 *
	 * @param ticketJson Ticket data in JSON format.
	 * @param photo      Optional image attached to the ticket.
	 * @param email      Authenticated user email.
	 */
	@PostMapping(value = "/createTicket", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<UserTicket> createTicket(@RequestPart("ticket") String ticketJson,
			@RequestPart(value = "photo", required = false) MultipartFile photo, @AuthenticationPrincipal String email)
			throws Exception {

		UserTicket ticket = mapper.readValue(ticketJson, UserTicket.class);
		UserTicket created = service.createTicket(email, ticket, photo);

		return ResponseEntity.ok(created);
	}

	/**
	 * Deletes a user ticket.
	 *
	 * Endpoint: POST /deleteTicket/{ticketId}
	 *
	 * @param ticketId Ticket identifier.
	 * @param email    Authenticated user email.
	 */
	@PostMapping("/deleteTicket/{ticketId}")
	public ResponseEntity<Void> deleteTicket(@PathVariable String ticketId, @AuthenticationPrincipal String email) {

		service.deleteTicket(email, ticketId);
		return ResponseEntity.noContent().build();
	}

	/**
	 * Gets all registered users (ADMIN only).
	 *
	 * Endpoint: GET /getUsers
	 */
	@GetMapping("/getUsers")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<List<User>> getUsers() {
		return ResponseEntity.ok(service.getUsers());
	}

	/**
	 * Deletes a user by email (ADMIN only).
	 *
	 * Endpoint: DELETE /deleteUser/{userEmail}
	 *
	 * @param userEmail Email of the user to delete.
	 */
	@DeleteMapping("/deleteUser/{userEmail}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Void> deleteUser(@PathVariable String userEmail) {
		service.deleteUser(userEmail);
		return ResponseEntity.noContent().build();
	}
}