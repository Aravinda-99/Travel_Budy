package com.example.backend.repo;

import com.example.backend.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaRepo extends JpaRepository<Media, Integer> {
}
