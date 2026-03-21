package com.listochef.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.listochef.model.User;
import com.listochef.repository.UserRepository;
import com.listochef.security.JWTService;

@Service
public class AuthService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;

    public AuthService(UserRepository repository,
                       PasswordEncoder passwordEncoder,
                       JWTService jwtService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }
    
    public Map<String, Object> login(User user) {
        Optional<User> userOptional = repository.findByEmail(user.getEmail());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid credentials");
        }

        User storedUser = userOptional.get();

        if (!passwordEncoder.matches(user.getPassword(), storedUser.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(storedUser.getEmail());
        storedUser.setPassword(null);
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", storedUser);
        
        return response;
    }
}
