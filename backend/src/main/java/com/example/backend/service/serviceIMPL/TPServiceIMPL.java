package com.example.backend.service.serviceIMPL;

import com.example.backend.dto.TPostDTO;
import com.example.backend.entity.TPost;
import com.example.backend.repo.TPostRepo;
import com.example.backend.service.TPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class TPServiceIMPL implements TPostService {
    @Autowired
    private TPostRepo tPostRepo;

    @Override
    public String savePost(TPostDTO tPostDTO) {
        // Create a new TPost entity
        TPost tPost = new TPost();

        // Set properties from the DTO
        tPost.setTopic(tPostDTO.getTopic());
        tPost.setDescription(tPostDTO.getDescription());
        tPost.setCreatedAt(LocalDateTime.now()); // Set current time

        // Save the entity to the repository
        tPostRepo.save(tPost);

        return "Post saved successfully!";
    }

    @Override
    public List<TPostDTO> getAllPosts() {
        List<TPost> tPosts = tPostRepo.findAll();

        List<TPostDTO> tPostDTOs = new ArrayList<>();

        for (TPost tPost : tPosts) {
            TPostDTO tPostDTO = new TPostDTO();

            tPostDTO.setTPid(tPost.getTPid());
            tPostDTO.setTopic(tPost.getTopic());
            tPostDTO.setDescription(tPost.getDescription());
            tPostDTO.setCreatedAt(tPost.getCreatedAt());

            tPostDTOs.add(tPostDTO);
        }

        return tPostDTOs;
    }
}