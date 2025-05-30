package com.example.backend.controller;

import com.example.backend.dto.TPostDTO;
import com.example.backend.service.TPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/tpost")
@CrossOrigin //Security Perpose walata use krnne

public class TPostController {
    @Autowired
    private TPostService tPostService;
    @PostMapping(path = "/save")
    public String savePost(@RequestBody TPostDTO tPostDTO) {
        String message = tPostService.savePost(tPostDTO);
        return message;
    }

    @GetMapping(path = "/post/get-all")
    public List<TPostDTO> getAllPosts() {
        return tPostService.getAllPosts();
    }

    @PutMapping(path = "/post/update")
    public String updatePost(@RequestBody TPostDTO tPostDTO) {
        String message = tPostService.updatePost(tPostDTO);
        return message;
    }

    @DeleteMapping(path = "/post/delete/{id}")
    public String deletePost(@PathVariable(value = "id") Long id) {
        return tPostService.deletePost(id);
    }
}
