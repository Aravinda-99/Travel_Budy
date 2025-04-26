package com.example.backend.repo;

import com.example.backend.entity.Comment;
import com.example.backend.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelRepo extends JpaRepository<Hotel,Integer> {
}
