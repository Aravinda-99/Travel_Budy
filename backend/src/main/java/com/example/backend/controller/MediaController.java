package com.example.backend.controller;

import com.example.backend.dto.MediaDTO;
import com.example.backend.service.MediaServie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//Controller ekk kiyl define krne me word eken and frontend ekt return krn data json fromat ekt convert krl send krnw
@RequestMapping("/api/media")
@CrossOrigin
public class MediaController {

    @Autowired
    private MediaServie mediaService;

    @PostMapping("/save")
    public ResponseEntity<String> createMedia(@RequestBody MediaDTO mediaDTO) {
        String response = mediaService.saveMedia(mediaDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("get-all")
    public ResponseEntity<List<MediaDTO>> getAllMedia() {
        List<MediaDTO> mediaList = mediaService.getAllMedia();
        return ResponseEntity.ok(mediaList);
    }

    @GetMapping("/get-media/{id}")
    public ResponseEntity<MediaDTO> getMediaById(@PathVariable Integer id) {
        List<MediaDTO> mediaList = mediaService.getAllMedia();
        MediaDTO media = mediaList.stream()
                .filter(m -> m.getId().equals(id))
                .findFirst()
                .orElse(null);
        
        if (media != null) {
            return ResponseEntity.ok(media);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/update-media/{id}")
    public ResponseEntity<String> updateMedia(@PathVariable Integer id, @RequestBody MediaDTO mediaDTO) {
        mediaDTO.setId(id);
        String response = mediaService.updateMedia(mediaDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete-media/{id}")
    public ResponseEntity<String> deleteMedia(@PathVariable Integer id) {
        String response = mediaService.deleteMedia(id);
        return ResponseEntity.ok(response);
    }
}
