package com.example.backend.service;

import com.example.backend.dto.MediaDTO;

import java.util.List;

public interface MediaServie {
    String saveMedia(MediaDTO mediaDto);

    String updateMedia(MediaDTO mediaDto);

    List<MediaDTO> getAllMedia();

    String deleteMedia(Integer id);
}
