package com.example.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_post")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long TPid;

    @Column(name = "topic", nullable = false, length = 255)
    private String topic;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;



    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();

    }
}