package com.example.backend.service.serviceIMPL;

import com.example.backend.dto.CommentDto;
import com.example.backend.entity.Comment;
import com.example.backend.repo.CommentRepo;
import com.example.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceIMPL implements CommentService {

    @Autowired
    private CommentRepo commentRepo;

    @Override
    public String saveComment(CommentDto commentDto) {
        Comment comment = new Comment();

        comment.setContent(commentDto.getContent());
        comment.setAuthor(commentDto.getAuthor());
        comment.setCreatedAt(commentDto.getCreatedAt());

        commentRepo.save(comment);

        return "Comment saved successfully!";
    }
}
