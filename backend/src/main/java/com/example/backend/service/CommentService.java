package com.example.backend.service;

import com.example.backend.dto.CommentDto;

import java.util.List;

public interface CommentService {
    String saveComment(CommentDto commentDto);

    String updateComment(CommentDto commentDto);

    List<CommentDto> getAllComments();

    String deleteComment(Integer id);
}
