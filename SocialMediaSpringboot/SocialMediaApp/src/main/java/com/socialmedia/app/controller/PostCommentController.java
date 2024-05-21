package com.socialmedia.app.controller;

import com.socialmedia.app.dto.PostCommentDto;
import com.socialmedia.app.entity.PostComment;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.service.PostCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class PostCommentController {
    @Autowired
    private PostCommentService postCommentService;
    @PostMapping("/app/comments")
    public PostComment createComment(@RequestBody PostCommentDto postCommentDto,
                                     @RequestHeader("Authorization") String token) throws CustomException {
        return postCommentService.createCommentService(postCommentDto,token);
    }
    @GetMapping("/app/comments")
    public List<PostComment> getAllPostComments(@RequestParam("postId") Long postId,
                                   @RequestParam(defaultValue = "0")Integer page,
                                   @RequestParam(defaultValue = "1")Integer size,
                                   @RequestHeader("Authorization") String token) throws CustomException {
        PageRequest pageRequest=PageRequest.of(page,size);
        List<PostComment>allPostComments= postCommentService.getAllPostComments(pageRequest,postId,token);
        return allPostComments;
    }
}
