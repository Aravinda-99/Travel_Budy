package com.example.backend.service;

import com.example.backend.dto.TPostDTO;

import java.util.List;

public interface TPostService {
    String savePost(TPostDTO tPostDTO);

    List<TPostDTO> getAllPosts();
}
