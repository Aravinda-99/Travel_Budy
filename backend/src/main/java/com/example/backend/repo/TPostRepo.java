package com.example.backend.repo;

import com.example.backend.entity.Media;
import com.example.backend.entity.TPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TPostRepo extends JpaRepository<TPost,Long> {
}
