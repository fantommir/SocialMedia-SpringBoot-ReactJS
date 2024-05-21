package com.socialmedia.app.service;

import com.socialmedia.app.entity.SavedPost;
import com.socialmedia.app.exceptions.CustomException;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface SavedPostService {
    SavedPost savePost(String token, Long postId) throws CustomException;
    List<SavedPost> getSavedPostsOfToken(String token, Pageable pageable) throws CustomException;
    SavedPost deleteSavedPost(String token, Long postId) throws CustomException;
    List<SavedPost> getAllSavedPostsService(String token) throws CustomException;
}
