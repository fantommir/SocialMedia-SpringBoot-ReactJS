package com.socialmedia.app.repository;

import com.socialmedia.app.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,Long> {
    boolean existsByPostIdAndUserId(Long postId,Integer userId);
    void deleteByPostIdAndUserId(Long postId,Integer userId);
    List<Notification> findAllByPostUserId(Integer id);
}
