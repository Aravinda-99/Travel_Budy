package com.example.backend.repo;

import com.example.backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users, Long> {

    @Query("SELECT u FROM Users u LEFT JOIN FETCH u.roles WHERE u.username = :username")
    Users findByUsername(String username);
}
