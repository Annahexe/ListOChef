package com.listochef.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.listochef.model.User;
import com.listochef.service.AuthService;

/**
 * Controller responsible for user authentication.
 *
 * Base URL: /ListOChef
 */
@RestController
@RequestMapping("/ListOChef")
public class AuthController {

	private final AuthService authService;

	/**
	 * Constructor of the AuthController.
	 *
	 * @param authService Service responsible for authentication logic.
	 */
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	/**
	 * Authenticates a user and returns login information.
	 *
	 * Endpoint: POST /login
	 *
	 * @param user User credentials.
	 * @return Authentication response data.
	 */
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
		return ResponseEntity.ok(authService.login(user));
	}
}