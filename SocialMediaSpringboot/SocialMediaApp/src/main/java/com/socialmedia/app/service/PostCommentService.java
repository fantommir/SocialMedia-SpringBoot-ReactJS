package com.socialmedia.app.service;

import com.socialmedia.app.dto.PostCommentDto;
import com.socialmedia.app.entity.Post;
import com.socialmedia.app.entity.PostComment;
import com.socialmedia.app.exceptions.CustomException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostCommentService {

    PostComment createCommentService(PostCommentDto postCommentDto,String token) throws CustomException;

    List<PostComment> getAllPostComments(Pageable pageable,Long postId, String token) throws CustomException;
}
