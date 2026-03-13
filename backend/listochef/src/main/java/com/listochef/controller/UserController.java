package com.listochef.controller;

import com.listochef.model.User;
import com.listochef.service.UserService;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
@RequestMapping("/ListOChef")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
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
        service.resetPassword(
            body.get("email"),
            body.get("codigo"),
            body.get("newPassword")
        );
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/changePassword")
    public ResponseEntity<Void> changePassword(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal String email) {

        service.changePassword(
            email,
            body.get("currentPassword"),
            body.get("newPassword")
        );
        return ResponseEntity.ok().build();
    }
    
}
