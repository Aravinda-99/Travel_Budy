package com.example.backend.repo;

import com.example.backend.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MediaRepo extends JpaRepository<Media,Integer> {
}
