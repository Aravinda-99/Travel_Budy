package com.example.backend.service.serviceIMPL;

import com.example.backend.entity.ERole;
import com.example.backend.entity.Role;
import com.example.backend.entity.Users;
import com.example.backend.repo.RoleRepo;
import com.example.backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;

    @Autowired
    private RoleRepo roleRepo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Map<String, Object> register(Users user) {
        Map<String, Object> response = new HashMap<>();
        
        // Validate required fields
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Username is required");
            return response;
        }

        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            response.put("success", false);
            response.put("message", "Password is required");
            return response;
        }

        // Check if username already exists
        if (repo.findByUsername(user.getUsername()) != null) {
            response.put("success", false);
            response.put("message", "Username already exists");
            return response;
        }

        try {
            // Encode password
            user.setPassword(encoder.encode(user.getPassword()));
            
            // Set default role as USER
            Set<Role> roles = new HashSet<>();
            Role userRole = roleRepo.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role USER is not found."));
            roles.add(userRole);
            user.setRoles(roles);
            
            // Save user
            Users savedUser = repo.save(user);
            
            // Generate JWT token
            String token = jwtService.generateToken(user.getUsername());
            
            // Prepare success response
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("token", token);
            
            // Remove password from response
            savedUser.setPassword(null);
            response.put("user", savedUser);
            
            return response;
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
            return response;
        }
    }

    public Map<String, Object> verify(Users user) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );
            
            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(user.getUsername());
                response.put("success", true);
                response.put("token", token);
                response.put("message", "Login successful");
                
                // Get user details
                Users userDetails = repo.findByUsername(user.getUsername());
                userDetails.setPassword(null); // Remove password from response
                response.put("user", userDetails);
            } else {
                response.put("success", false);
                response.put("message", "Authentication failed");
            }
        } catch (AuthenticationException e) {
            response.put("success", false);
            response.put("message", "Invalid username or password");
        }
        
        return response;
    }

    public Map<String, Object> updateUserRole(String username, ERole newRole) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Users user = repo.findByUsername(username);
            if (user == null) {
                response.put("success", false);
                response.put("message", "User not found");
                return response;
            }

            Role role = roleRepo.findByName(newRole)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

            Set<Role> roles = new HashSet<>();
            roles.add(role);
            user.setRoles(roles);
            
            Users updatedUser = repo.save(user);
            updatedUser.setPassword(null); // Remove password from response
            
            response.put("success", true);
            response.put("message", "User role updated successfully");
            response.put("user", updatedUser);
            
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to update user role: " + e.getMessage());
        }
        
        return response;
    }
}
