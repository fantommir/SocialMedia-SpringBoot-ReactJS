package com.socialmedia.app.repository;

import com.socialmedia.app.entity.SavedPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedPostRepository extends JpaRepository<SavedPost,Long> {
    Page<SavedPost> findPostByUserId(Integer userId, Pageable pageable);
    SavedPost findPostByPostIdAndUserId(Long id, Integer userId);
    List<SavedPost> findAllSavedPostsByUserId(Integer id);
}
