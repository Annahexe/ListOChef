package com.listochef.service;

import org.springframework.stereotype.Service;

import com.listochef.model.User;
import com.listochef.repository.UserRepository;

@Service
public class UserService {
	
	private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
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
        
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        repository.register(user);
    }
	
}
