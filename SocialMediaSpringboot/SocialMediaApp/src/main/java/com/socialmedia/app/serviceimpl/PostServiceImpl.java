package com.socialmedia.app.serviceimpl;

import com.socialmedia.app.entity.Post;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.repository.PostRepository;
import com.socialmedia.app.repository.UserRepository;
import com.socialmedia.app.service.NotificationService;
import com.socialmedia.app.service.PostService;
import com.socialmedia.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private NotificationService notificationService;
    public Post createPostService(Post post,String token) throws CustomException {
        User tokenUser=userService.findUserByToken(token);
        String email=tokenUser.getEmail();
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new CustomException("User not found with the Token");
        }
        Post newPost=new Post();
        newPost.setDescription(post.getDescription());
        newPost.setImage(post.getImage());
        newPost.setUser(user);
        Post savedPost=postRepository.save(newPost);
        user.setPassword(null);
        savedPost.setUser(user);
        return savedPost;
    }

    @Override
    public List<Post> getAllPostsService(Pageable pageable) {
        List<Post>allPosts=postRepository.findAll(pageable).getContent();
        return allPosts;
    }

    @Override
    public List<Post> getPostsByUserId(String token,Pageable pageable) throws CustomException {
        User user=userService.findUserByToken(token);
        List<Post>allPostsOfUser=postRepository.findPostsByUserId(user.getId(),pageable).stream().toList();
        return allPostsOfUser;
    }

    @Override
    public Post likePost(String token, Long postId) throws CustomException {
        User user=userService.findUserByToken(token);
        Post dbPost=postRepository.findById(postId).get();
        if(user != null){
            if(dbPost.getLikes().contains(user)){
                dbPost.getLikes().remove(user);
                notificationService.likeNotificationService(token,postId);
            }
            else{
                dbPost.getLikes().add(user);
                notificationService.likeNotificationService(token,postId);
            }
        }
        Post post =postRepository.save(dbPost);
        return post;
    }

    @Override
    public Integer tokenUserPostCount(String token) throws CustomException {
        User user=userService.findUserByToken(token);
        List<Post>allTokenUserPosts=postRepository.findAllPostsByUserId(user.getId());
        return allTokenUserPosts.size();
    }

    @Override
    public List<Post> getAllUsersPosts(String token) throws CustomException {
        User user=userService.findUserByToken(token);
        return postRepository.findAllPostsByUserId(user.getId());
    }

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostByIdService(String token, Long postId) {
        User user = userService.findUserByToken(token);
        Optional<Post> post = postRepository.findById(postId);
        return post.orElseThrow(() -> new CustomException("Post not found with that postId"));
    }
}
