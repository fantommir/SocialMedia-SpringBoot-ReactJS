package com.socialmedia.app.controller;

import com.socialmedia.app.entity.Post;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class PostController {
    @Autowired
    private PostService postService;
    @PostMapping("/app/posts")
    public Post createPost(@RequestParam("desc")String description,
                             @RequestParam("image") MultipartFile image,
                           @RequestHeader("Authorization")String token) throws CustomException, IOException {
        Post newPost=new Post();
        newPost.setDescription(description);
        newPost.setImage(image.getBytes());
        return postService.createPostService(newPost,token);
    }
    @GetMapping("/allPosts")
    public List<Post> getAllPosts(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "1") Integer size){
        PageRequest pageRequest = PageRequest.of(page, size);
        return postService.getAllPostsService(pageRequest);
    }
    @GetMapping("/app/posts")
    public List<Post>getPostsByUserId(@RequestHeader("Authorization")String token,
                                      @RequestParam(defaultValue = "0")Integer page,
                                      @RequestParam(defaultValue = "1")Integer size) throws CustomException {
        PageRequest pageRequest=PageRequest.of(page,size);
        List<Post>allPosts=postService.getPostsByUserId(token,pageRequest);
        return allPosts;
    }
    @PutMapping("/app/liked")
    public Post likePost(@RequestHeader("Authorization")String token,
                        @RequestParam("postId") Long postId) throws CustomException {
        Post post= postService.likePost(token,postId);
        return post;
    }
    @GetMapping("/allpostsnoti")
    public List<Post>allUsersAllPosts(){
        return postService.getAllPosts();
    }
    @GetMapping("/app/postscount")
    public Integer tokenUserPostCount(@RequestHeader("Authorization")String token) throws CustomException {
        Integer count= postService.tokenUserPostCount(token);
        return count;
    }
    @GetMapping("/app/allposts")
    public List<Post>getAllUsersPosts(@RequestHeader("Authorization")String token) throws CustomException {
        return postService.getAllUsersPosts(token);
    }
    @GetMapping("/app/getpost")
    public Post getPostById(@RequestHeader("Authorization")String token,
            @RequestParam("postId")Long postId){
        return postService.getPostByIdService(token,postId);
    }
}
