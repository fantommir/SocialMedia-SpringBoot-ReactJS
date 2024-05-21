package com.socialmedia.app.controller;

import com.socialmedia.app.entity.Notification;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @PostMapping("/app/likenotification")
    public void likeNotification(@RequestHeader("Authorization")String token,
                                         @RequestParam("postId")Long postId) throws CustomException {
        notificationService.likeNotificationService(token,postId);
    }
    @GetMapping("/app/notification")
    public List<Notification>allNotification(@RequestHeader("Authorization")String token
                                                ) throws CustomException {
        return notificationService.getAllNotifications(token);
    }
}
