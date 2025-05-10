package com.example.backend.controller;

import com.example.backend.entity.ERole;
import com.example.backend.entity.Users;
import com.example.backend.service.serviceIMPL.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService service;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody Users user) {
        return ResponseEntity.ok(service.register(user));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Users user) {
        return ResponseEntity.ok(service.verify(user));
    }

    @PutMapping("/role/{username}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> updateUserRole(
            @PathVariable String username,
            @RequestParam ERole role) {
        return ResponseEntity.ok(service.updateUserRole(username, role));
    }
}
