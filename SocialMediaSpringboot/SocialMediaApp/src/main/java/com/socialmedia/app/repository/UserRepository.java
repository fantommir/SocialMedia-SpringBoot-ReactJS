package com.socialmedia.app.repository;

import com.socialmedia.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findByEmail(String email);
    @Query("from User where name LIKE %:name% OR email LIKE %:name%")
    List<User> searchUser(@Param("name") String name);
}
