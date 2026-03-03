package com.listochef.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.listochef.model.User;
import com.listochef.repository.UserRepository;

@Service
public class AuthService {

	private final UserRepository repository;

    public AuthService(UserRepository repository) {
        this.repository = repository;
    }
    
	public boolean login(User user) {
		
		Optional<User> userOptional = repository.findByEmail(user.getEmail());

	    if (userOptional.isEmpty()) {
	        return false;
	    }
	    
	    User userToLogin = userOptional.get();

	    if (userToLogin.getPassword().equals(user.getPassword())) {
	        return true;
	    }
	    
		return false;
	}
}
