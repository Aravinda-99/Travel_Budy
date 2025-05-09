package com.example.backend.service.serviceIMPL;

import com.example.backend.dto.MediaDTO;
import com.example.backend.entity.Media;
import com.example.backend.repo.MediaRepo;
import com.example.backend.service.MediaServie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MediaServiceIMPL implements MediaServie {

    @Autowired
    private MediaRepo mediaRepo;

    @Override
    public String saveMedia(MediaDTO mediaDto) {
        Media media = mediaDto.toEntity();
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
            Media media = existingMedia.get();
            media.setTitle(mediaDto.getTitle());
            media.setLocation(mediaDto.getLocation());
            media.setImageUrls(mediaDto.getImageUrls());
            media.setDescription(mediaDto.getDescription());
            // Note: createdAt is not updated as it's marked updatable=false in the entity

            mediaRepo.save(media);
            return "Media updated successfully!";
        } else {
            return "Media not found with ID: " + mediaDto.getId();
        }
    }

    @Override
    public List<MediaDTO> getAllMedia() {
        List<Media> mediaList = mediaRepo.findAll();
        List<MediaDTO> mediaDtos = new ArrayList<>();

        for (Media media : mediaList) {
            mediaDtos.add(MediaDTO.fromEntity(media));
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
