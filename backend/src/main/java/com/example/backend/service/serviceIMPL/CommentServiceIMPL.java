package com.example.backend.service.serviceIMPL;

import com.example.backend.dto.CommentDto;
import com.example.backend.entity.Comment;
import com.example.backend.repo.CommentRepo;
import com.example.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceIMPL implements CommentService {

    @Autowired
    private CommentRepo commentRepo;

    @Override
    public String saveComment(CommentDto commentDto) {
        Comment comment = new Comment();

        comment.setContent(commentDto.getContent());
        comment.setAuthor(commentDto.getAuthor());
//        comment.setCreatedAt(commentDto.getCreatedAt());

        commentRepo.save(comment);

        return "Comment saved successfully!";
    }

    @Override
    public String updateComment(CommentDto commentDto) {
        if (commentDto.getId() == null) {
            return "Comment ID is required for update";
        }

        Optional<Comment> existingComment = commentRepo.findById(commentDto.getId());
        if (existingComment.isPresent()) {
            Comment comment = existingComment.get();
            comment.setContent(commentDto.getContent());
            comment.setAuthor(commentDto.getAuthor());
            // Note: We're not updating createdAt as it's marked updatable=false in the entity

            commentRepo.save(comment);
            return "Comment updated successfully!";
        } else {
            return "Comment not found with ID: " + commentDto.getId();
        }
    }

    @Override
    public List<CommentDto> getAllComments() {
        List<Comment> comments = commentRepo.findAll();
        List<CommentDto> commentDtos = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDto dto = new CommentDto();
            dto.setId(comment.getId());
            dto.setContent(comment.getContent());
            dto.setAuthor(comment.getAuthor());
            dto.setCreatedAt(comment.getCreatedAt());

            commentDtos.add(dto);
        }

        return commentDtos;
    }

    @Override
    public String deleteComment(Integer id) {
        if (commentRepo.existsById(id)) {
            commentRepo.deleteById(id);
            return "Comment deleted successfully!";
        } else {
            return "No comment found with ID: " + id;
        }
    }
}
