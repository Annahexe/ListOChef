package com.listochef.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.listochef.model.User;
import com.listochef.service.AuthService;

@RestController
@RequestMapping("/ListOChef")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        return ResponseEntity.ok(authService.login(user));
    }

}
