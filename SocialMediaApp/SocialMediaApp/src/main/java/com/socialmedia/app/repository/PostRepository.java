package com.socialmedia.app.repository;

import com.socialmedia.app.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
//    @Query("from Post p where p.user.id=:userId")  //here the entity name must be case sensitive.
    List<Post> findPostsByUserId(Integer userId, Pageable pageable);
    List<Post> findAllPostsByUserId(Integer id);
}
