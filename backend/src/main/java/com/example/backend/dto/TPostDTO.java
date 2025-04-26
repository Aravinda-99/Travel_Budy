package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TPostDTO {

    private Long tPid;
    private String topic;
    private String description;
    private LocalDateTime createdAt;

    // Optional: Method to convert from Entity to DTO
    public static TPostDTO fromEntity(com.example.backend.entity.TPost entity) {
        return TPostDTO.builder()
                .tPid(entity.getTPid())
                .topic(entity.getTopic())
                .description(entity.getDescription())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    // Optional: Method to convert from DTO to Entity
    public com.example.backend.entity.TPost toEntity() {
        return com.example.backend.entity.TPost.builder()
                .TPid(this.tPid)
                .topic(this.topic)
                .description(this.description)
                .createdAt(this.createdAt)
                .build();
    }
}