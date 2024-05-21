package com.socialmedia.app.controller;

import com.socialmedia.app.entity.SavedPost;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.service.SavedPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("http://localhost:5173/")
public class SavedPostController {
    @Autowired
    private SavedPostService savedPostService;
    @PutMapping("/app/saved")
    public SavedPost savePost(@RequestHeader("Authorization")String token,
                         @RequestParam("postId") Long postId) throws CustomException {
        System.out.println("entered "+postId);
        return savedPostService.savePost(token,postId);
    }
    @DeleteMapping("/app/saved")
    public SavedPost deletePost(@RequestHeader("Authorization")String token,
                              @RequestParam("postId") Long postId) throws CustomException {
        return savedPostService.deleteSavedPost(token,postId);
    }
    @GetMapping("/app/saved")
    public List<SavedPost>allSavedPosts(@RequestHeader("Authorization")String token) throws CustomException {
        return savedPostService.getAllSavedPostsService(token);
    }
    @GetMapping("/app/getsaved")
    public List<SavedPost> getAllSavedPost(@RequestHeader("Authorization")String token,
                                            @RequestParam(defaultValue = "0")Integer page,
                                            @RequestParam(defaultValue = "1")Integer size) throws CustomException {
        PageRequest pageRequest=PageRequest.of(page,size);
        return savedPostService.getSavedPostsOfToken(token,pageRequest);
    }
}
