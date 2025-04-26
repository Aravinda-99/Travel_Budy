package com.example.backend.service.serviceIMPL;

import com.example.backend.dto.MediaDTO;
import com.example.backend.repo.MediaRepo;
import com.example.backend.service.MediaServie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MediaServiceIMPL implements MediaServie {

    @Autowired
    private MediaRepo mediaRepo;

    @Override
    public String saveMedia(MediaDTO mediaDto) {
        // Create a new Media entity
        com.example.backend.entity.Media media = new com.example.backend.entity.Media();

        // Set properties from the DTO
        media.setImageUrls(mediaDto.getImageUrls());
        media.setDescription(mediaDto.getDescription());
        media.setCreatedAt(LocalDateTime.now()); // Set current time or use mediaDto.getCreatedAt()

        // Save the entity to the repository
        mediaRepo.save(media);

        return "Media saved successfully!";
    }
}
