package com.example.backend.service.serviceIMPL;

import com.example.backend.dto.TPostDTO;
import com.example.backend.entity.TPost;
import com.example.backend.repo.TPostRepo;
import com.example.backend.service.TPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TPServiceIMPL implements TPostService {
    @Autowired
    private TPostRepo tPostRepo;

    @Override
    public String savePost(TPostDTO tPostDTO) {
        // Ensure user is authenticated
        if (SecurityContextHolder.getContext().getAuthentication() == null ||
            !SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
            throw new SecurityException("User must be authenticated to save a post");
        }

        try {
            // Create a new TPost entity using the builder pattern
            TPost tPost = TPost.builder()
                .topic(tPostDTO.getTopic())
                .description(tPostDTO.getDescription())
                .createdAt(LocalDateTime.now())
                .build();

            // Save the entity
            tPostRepo.save(tPost);
            return "Post saved successfully!";
        } catch (Exception e) {
            throw new RuntimeException("Failed to save post: " + e.getMessage());
        }
    }

    @Override
    public List<TPostDTO> getAllPosts() {
        List<TPost> tPosts = tPostRepo.findAll();
        List<TPostDTO> tPostDTOs = new ArrayList<>();

        for (TPost tPost : tPosts) {
            tPostDTOs.add(TPostDTO.fromEntity(tPost));
        }

        return tPostDTOs;
    }

    @Override
    public String updatePost(TPostDTO tPostDTO) {
        if (tPostDTO.getTPid() == null) {
            return "Post ID cannot be null for update operation";
        }

        // Ensure user is authenticated
        if (SecurityContextHolder.getContext().getAuthentication() == null ||
            !SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
            throw new SecurityException("User must be authenticated to update a post");
        }

        try {
            Optional<TPost> existingPost = tPostRepo.findById(tPostDTO.getTPid());

            if (existingPost.isPresent()) {
                TPost tPost = existingPost.get();
                tPost.setTopic(tPostDTO.getTopic());
                tPost.setDescription(tPostDTO.getDescription());
                
                tPostRepo.save(tPost);
                return "Post updated successfully!";
            } else {
                return "Post not found with ID: " + tPostDTO.getTPid();
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to update post: " + e.getMessage());
        }
    }

    @Override
    public String deletePost(Long id) {
        if (id == null) {
            return "Post ID cannot be null for delete operation";
        }

        // Ensure user is authenticated
        if (SecurityContextHolder.getContext().getAuthentication() == null ||
            !SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
            throw new SecurityException("User must be authenticated to delete a post");
        }

        try {
            Optional<TPost> existingPost = tPostRepo.findById(id);

            if (existingPost.isPresent()) {
                tPostRepo.deleteById(id);
                return "Post deleted successfully!";
            } else {
                return "Post not found with ID: " + id;
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete post: " + e.getMessage());
        }
    }
}