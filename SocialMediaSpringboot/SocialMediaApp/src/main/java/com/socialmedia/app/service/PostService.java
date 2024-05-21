package com.socialmedia.app.service;

import com.socialmedia.app.entity.Post;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {
    Post createPostService(Post post,String token) throws CustomException;
    List<Post> getAllPostsService(Pageable pageable);
    List<Post> getPostsByUserId( String token,Pageable pageable) throws CustomException;
    Post likePost(String token,Long postId) throws CustomException;
    Integer tokenUserPostCount(String token) throws CustomException;
    List<Post> getAllUsersPosts(String token) throws CustomException;
    List<Post> getAllPosts();
    Post getPostByIdService(String token,Long postId);
}
