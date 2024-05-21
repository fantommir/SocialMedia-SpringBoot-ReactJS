package com.socialmedia.app.serviceimpl;

import com.socialmedia.app.entity.Notification;
import com.socialmedia.app.entity.Post;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.repository.NotificationRepository;
import com.socialmedia.app.repository.PostRepository;
import com.socialmedia.app.service.NotificationService;
import com.socialmedia.app.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private UserService userService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    @Override
    @Transactional
    public void likeNotificationService(String token, Long postId) throws CustomException {
        User user=userService.findUserByToken(token);
        Optional<Post> post=postRepository.findById(postId);
        List<Notification>allNotifications=notificationRepository.findAll();
        if(user!=null&&post.isPresent()&&!post.get().getUser().getId().equals(user.getId())){
            boolean postExistsInNotifications = notificationRepository.existsByPostIdAndUserId(postId,user.getId());
            Notification notification = new Notification();
            if (postExistsInNotifications) {
                notificationRepository.deleteByPostIdAndUserId(postId,user.getId());
            }
            if (!postExistsInNotifications) {
                notification.setPost(post.get());
                notification.setUser(user);
                notificationRepository.save(notification);
            }
        }
    }

    @Override
    public List<Notification> getAllNotifications(String token) throws CustomException {
        User user=userService.findUserByToken(token);
        List<Notification>allNotifications=notificationRepository.findAllByPostUserId(user.getId());
        return allNotifications;
    }
}
