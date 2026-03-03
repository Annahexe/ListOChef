package com.listochef.controller;

import com.listochef.model.User;
import com.listochef.service.UserService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

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
    
}
