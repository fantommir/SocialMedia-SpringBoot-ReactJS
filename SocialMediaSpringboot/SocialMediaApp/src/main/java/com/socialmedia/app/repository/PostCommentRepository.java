package com.socialmedia.app.repository;

import com.socialmedia.app.entity.PostComment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostCommentRepository extends JpaRepository<PostComment,Long> {
    List<PostComment> findCommentsByPostId(Pageable pageable, Long postId);
}
