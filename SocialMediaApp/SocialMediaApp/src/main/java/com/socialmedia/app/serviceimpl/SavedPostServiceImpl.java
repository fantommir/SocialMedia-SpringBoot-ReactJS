package com.socialmedia.app.serviceimpl;

import com.socialmedia.app.entity.Post;
import com.socialmedia.app.entity.SavedPost;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.repository.PostRepository;
import com.socialmedia.app.repository.SavedPostRepository;
import com.socialmedia.app.service.SavedPostService;
import com.socialmedia.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class SavedPostServiceImpl implements SavedPostService {
    @Autowired
    private UserService userService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private SavedPostRepository savedPostRepository;
    @Override
    public SavedPost savePost(String token, Long postId) throws CustomException {
        User user = userService.findUserByToken(token);
        Optional<Post> dbPost = postRepository.findById(postId);
        SavedPost dbSavedPost=savedPostRepository.findPostByPostIdAndUserId(dbPost.get().getId(),user.getId());
        if(dbSavedPost!=null){
           SavedPost deletedPost=dbSavedPost;
           savedPostRepository.delete(dbSavedPost);
           return deletedPost;

        }
        else{
            SavedPost savedPost=new SavedPost();
            savedPost.setPost(dbPost.get());
            savedPost.setUser(user);
            return savedPostRepository.save(savedPost);
        }
    }
    @Override
    public List<SavedPost> getSavedPostsOfToken(String token, Pageable pageable) throws CustomException {
        User user=userService.findUserByToken(token);
        List<SavedPost> savedPost=savedPostRepository.findPostByUserId(user.getId(),pageable).getContent();
        return savedPost;
    }

    @Override
    public SavedPost deleteSavedPost(String token, Long postId) throws CustomException {
        User user=userService.findUserByToken(token);
        SavedPost savedPost=savedPostRepository.findPostByPostIdAndUserId(postId,user.getId());
        savedPostRepository.delete(savedPost);
        return savedPost;
    }

    @Override
    public List<SavedPost> getAllSavedPostsService(String token) throws CustomException {
        User user=userService.findUserByToken(token);
        List<SavedPost> allSavedPosts=savedPostRepository.findAllSavedPostsByUserId(user.getId());
        return  allSavedPosts;
    }
}