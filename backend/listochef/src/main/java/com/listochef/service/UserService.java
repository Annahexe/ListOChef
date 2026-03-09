package com.listochef.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.listochef.model.User;
import com.listochef.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	// 🔹 Crear usuario
	public void register(User user) {

		// Validaciones básicas
		if (user.getNickname() == null || user.getNickname().isBlank()) {
			throw new IllegalArgumentException("User name cannot be empty");
		}

		if (user.getEmail() == null || user.getEmail().isBlank()) {
			throw new IllegalArgumentException("User email cannot be empty");
		}

		if (user.getPassword() == null || user.getPassword().isBlank()) {
			throw new IllegalArgumentException("User password cannot be empty");
		}

		if (userRepository.findByEmail(user.getEmail()).isPresent()) {
			throw new RuntimeException("User already exists");
		}
		
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        user.setPassword(hashedPassword);

		userRepository.register(user);
	}
	
	public Optional<User> getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	
}
