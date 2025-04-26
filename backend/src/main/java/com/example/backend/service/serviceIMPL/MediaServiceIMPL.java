package com.example.backend.service.serviceIMPL;

import com.example.backend.dto.MediaDTO;
import com.example.backend.entity.Media;
import com.example.backend.repo.MediaRepo;
import com.example.backend.service.MediaServie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Override
    public String updateMedia(MediaDTO mediaDto) {
        if (mediaDto.getId() == null) {
            return "Media ID is required for update";
        }

        Optional<Media> existingMedia = mediaRepo.findById(mediaDto.getId());
        if (existingMedia.isPresent()) {
            com.example.backend.entity.Media media = existingMedia.get();
            media.setImageUrls(mediaDto.getImageUrls());
            media.setDescription(mediaDto.getDescription());
            // Note: We're not updating createdAt as it's typically marked updatable=false in the entity

            mediaRepo.save(media);
            return "Media updated successfully!";
        } else {
            return "Media not found with ID: " + mediaDto.getId();
        }
    }

    @Override
    public List<MediaDTO> getAllMedia() {
        List<com.example.backend.entity.Media> mediaList = mediaRepo.findAll();
        List<MediaDTO> mediaDtos = new ArrayList<>();

        for (com.example.backend.entity.Media media : mediaList) {
            MediaDTO dto = new MediaDTO();
            dto.setId(media.getId());
            dto.setImageUrls(media.getImageUrls());
            dto.setDescription(media.getDescription());
            dto.setCreatedAt(media.getCreatedAt());

            mediaDtos.add(dto);
        }

        return mediaDtos;
    }

    @Override
    public String deleteMedia(Integer id) {
        if (mediaRepo.existsById(id)) {
            mediaRepo.deleteById(id);
            return "Media deleted successfully!";
        } else {
            return "No media found with ID: " + id;
        }
    }
}
