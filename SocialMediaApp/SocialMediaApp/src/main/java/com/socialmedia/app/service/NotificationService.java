package com.socialmedia.app.service;

import com.socialmedia.app.entity.Notification;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.exceptions.EmptyMessageImageException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NotificationService {
    void likeNotificationService(String token, Long postId) throws CustomException;
    List<Notification> getAllNotifications(String token) throws CustomException;
}
