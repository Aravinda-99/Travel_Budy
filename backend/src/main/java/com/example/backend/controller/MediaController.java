package com.example.backend.controller;


import com.example.backend.dto.MediaDTO;
import com.example.backend.service.MediaServie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("api/v1/media")
@CrossOrigin //Security Perpose walata use krnne
public class MediaController {

    @Autowired
    private MediaServie mediaService;

    @PostMapping(path = "/media/save")
    public String saveMedia(@RequestBody MediaDTO mediaDto) {
        String message = mediaService.saveMedia(mediaDto);
        return message;
    }

    @PutMapping(path = "/media/update")
    public String updateMedia(@RequestBody MediaDTO mediaDto) {
        String message = mediaService.updateMedia(mediaDto);
        return message;
    }


}
