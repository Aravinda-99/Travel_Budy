package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MediaDTO {

    private Integer id;
    private String title;
    private String location;
    
    @Builder.Default
    private Set<String> imageUrls = new HashSet<>();

    private String description;
    private LocalDateTime createdAt;

    // Optional: Conversion methods between Entity and DTO
    public static MediaDTO fromEntity(com.example.backend.entity.Media media) {
        return MediaDTO.builder()
                .id(media.getId())
                .title(media.getTitle())
                .location(media.getLocation())
                .imageUrls(media.getImageUrls())
                .description(media.getDescription())
                .createdAt(media.getCreatedAt())
                .build();
    }

    public com.example.backend.entity.Media toEntity() {
        return com.example.backend.entity.Media.builder()
                .id(this.id)
                .title(this.title)
                .location(this.location)
                .imageUrls(this.imageUrls)
                .description(this.description)
                .createdAt(this.createdAt)
                .build();
    }
}