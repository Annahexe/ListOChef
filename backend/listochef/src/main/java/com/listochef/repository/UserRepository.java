package com.listochef.repository;

import java.util.Optional;

import com.listochef.model.User;

public interface UserRepository {

	Optional<User> findByEmail(String email);
		
	User register(User user);
	
}
