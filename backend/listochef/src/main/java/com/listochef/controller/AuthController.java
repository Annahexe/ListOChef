package com.listochef.controller;

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
    public String login(@RequestBody User user) {
        return authService.login(user);
    }

}
