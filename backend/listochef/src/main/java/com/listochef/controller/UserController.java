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
            body.get("code"),
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
    
    @PostMapping("/editProfile")
    public ResponseEntity<Void> editProfile(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal String email) {
        service.editProfile(email, body);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/toggleSaved")
    public ResponseEntity<String> toggleRecipeSaved(
            @RequestBody String recipeId,
            @AuthenticationPrincipal String email) {
        boolean saved = service.toggleRecipeSaved(email, recipeId);
        return ResponseEntity.ok().body("saved:" + saved);
    }
    
    @PostMapping("/removeFromGroceryList")
    public ResponseEntity<Void> removeFromGroceryList(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal String email) {
        service.removeFromGroceryList(email, body.get("ingredientName"));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/removeFromPantryList")
    public ResponseEntity<Void> removeFromPantryList(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal String email) {
        service.removeFromPantryList(email, body.get("ingredientName"));
        return ResponseEntity.ok().build();
    }
}
