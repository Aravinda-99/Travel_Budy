package com.example.backend.config;

import com.example.backend.entity.ERole;
import com.example.backend.entity.Role;
import com.example.backend.repo.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private RoleRepo roleRepo;

    @Override
    public void run(String... args) {
        try {
            // Initialize roles if they don't exist
            for (ERole role : ERole.values()) {
                if (roleRepo.findByName(role).isEmpty()) {
                    Role newRole = new Role(role);
                    roleRepo.save(newRole);
                }
            }
        } catch (Exception e) {
            System.err.println("Error initializing roles: " + e.getMessage());
        }
    }
} 