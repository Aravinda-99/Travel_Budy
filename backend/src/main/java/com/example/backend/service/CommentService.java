package com.example.backend.service;

import com.example.backend.dto.CommentDto;

public interface CommentService {
    String saveComment(CommentDto commentDto);

    String updateComment(CommentDto commentDto);
}
