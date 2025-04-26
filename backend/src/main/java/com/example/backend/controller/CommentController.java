package com.example.backend.controller;

import com.example.backend.dto.CommentDto;
import com.example.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/comment")
@CrossOrigin //Security Perpose walata use krnne
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping(path = "/save")
    public String saveComment(@RequestBody CommentDto commentDto) {
        String message = commentService.saveComment(commentDto);
        return message;
    }

    @PutMapping(path = "/update")
    public String updateComment(@RequestBody CommentDto commentDto) {
        String message = commentService.updateComment(commentDto);
        return message;
    }

    @GetMapping(path = "/get-all-items")
    public List<CommentDto> getAllComments() {
        return commentService.getAllComments();
    }

    @DeleteMapping(path = "/delete-item/{id}")
    public String deleteComment(@PathVariable(value = "id") Integer id) {
        return commentService.deleteComment(id);
    }

}
