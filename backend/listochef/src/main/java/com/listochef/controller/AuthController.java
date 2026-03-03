package com.listochef.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.listochef.model.User;
import com.listochef.service.AuthService;

@RestController
@RequestMapping("/ListOChef")
public class AuthController {

	private final AuthService service;

	public AuthController(AuthService service) {
		this.service = service;
	}

	@GetMapping("/login")
	public ResponseEntity<User> getRecipeById(@RequestBody User user) {
		boolean loginSuccess = service.login(user);
		if (loginSuccess) {
			return ResponseEntity.status(200).build();
		} else {
			return ResponseEntity.status(401).build();
		}
	}

}
