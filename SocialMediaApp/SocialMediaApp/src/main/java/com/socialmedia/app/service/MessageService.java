package com.socialmedia.app.service;

import com.socialmedia.app.entity.Message;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.exceptions.EmptyMessageImageException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MessageService {
    List<User> getAllTokenFollowerObjects(String token, Pageable pageable) throws CustomException;
    Message sendMessageService(String message, MultipartFile image, Integer receiverId, String token) throws EmptyMessageImageException, IOException;
    List<Message> getAllTokenUserMessagesService(String token,Integer receiverId,Pageable pageable) throws CustomException;
    List<Message> getAllReceiverUserMessagesService(String token, Integer receiverId,Pageable pageable) throws CustomException;
    Long getAllReceiverMessagesCount(String token, Integer receiveUserId) throws CustomException;
    List<Message> sendMessageToAllUsersService(String token, Long postId, List<Integer> checkedUser);
    Long getAllSenderMessagesCount(String token, Integer receiverId);
    ResponseEntity<?> getAllMessages(String token, PageRequest pageRequest, Integer receiverId);
}
