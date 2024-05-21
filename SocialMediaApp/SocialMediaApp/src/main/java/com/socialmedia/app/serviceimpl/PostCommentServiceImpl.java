package com.socialmedia.app.serviceimpl;

import com.socialmedia.app.dto.PostCommentDto;
import com.socialmedia.app.entity.Post;
import com.socialmedia.app.entity.PostComment;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.repository.PostCommentRepository;
import com.socialmedia.app.repository.PostRepository;
import com.socialmedia.app.service.PostCommentService;
import com.socialmedia.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostCommentServiceImpl implements PostCommentService {
    @Autowired
    private UserService userService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostCommentRepository postCommentRepository;
    @Override
    public PostComment createCommentService(PostCommentDto postCommentDto,String token) throws CustomException {
        User user=userService.findUserByToken(token);
        User existedUser=userService.findUserById(user.getId());
        Optional<Post> post=postRepository.findById(postCommentDto.getPostId());
        if(existedUser!=null&&post.isPresent()){
            PostComment postComment=new PostComment();
            postComment.setText(postCommentDto.getCommentText());
            postComment.setUser(existedUser);
            postComment.setPost(post.get());
            return postCommentRepository.save(postComment);
        }
        throw new CustomException("User or Post is Not Found ");
    }

    @Override
    public List<PostComment> getAllPostComments(Pageable pageable, Long postId, String token) throws CustomException {
        User user = userService.findUserByToken(token);
        User existedUser = userService.findUserById(user.getId());
        Post post = postRepository.findById(postId).orElse(null);
        if (existedUser != null && post != null) {
            List<PostComment>pages=postCommentRepository.findCommentsByPostId(pageable,postId);
            return pages;
        }
        throw new CustomException("Invalid Credentials Please try to Login then Fetch ");
    }
}
