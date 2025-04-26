package com.example.backend.service;

import com.example.backend.dto.MediaDTO;

public interface MediaServie {
    String saveMedia(MediaDTO mediaDto);

    String updateMedia(MediaDTO mediaDto);
}
