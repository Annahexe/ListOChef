package com.listochef.controller;

import com.listochef.security.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestJwtController {

    @Autowired
    private JWTService jwtService;

    // Generar token
    @GetMapping("/generate")
    public Map<String, String> generateToken(@RequestParam String email) {
        String token = jwtService.generateToken(email);
        
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        
        return response;
    }

    // Validar token
    @PostMapping("/validate")
    public Map<String, Object> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String email = request.get("email");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            String extractedEmail = jwtService.extractEmail(token);
            boolean isValid = jwtService.validateToken(token, email);
            
            response.put("extractedEmail", extractedEmail);
            response.put("isValid", isValid);
        } catch (Exception e) {
            response.put("error", e.getMessage());
        }
        
        return response;
    }
    
    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}