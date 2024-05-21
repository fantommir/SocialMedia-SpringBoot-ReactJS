package com.socialmedia.app.serviceimpl;
import com.socialmedia.app.dto.MessageResponseDto;
import com.socialmedia.app.entity.Message;
import com.socialmedia.app.entity.Post;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.exceptions.EmptyMessageImageException;
import com.socialmedia.app.repository.MessageRepository;
import com.socialmedia.app.service.MessageService;
import com.socialmedia.app.service.PostService;
import com.socialmedia.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private UserService userService;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private PostService postService;
    @Override
    public List<User> getAllTokenFollowerObjects(String token, Pageable pageable) throws CustomException {
        User user = userService.findUserByToken(token);
        Set<Integer> allFollowersNo = user.getFollowers();
        Set<Integer>allFollowingsNo=user.getFollowings();
        List<Integer>messagedUsers=new ArrayList<>(allFollowingsNo);
        messagedUsers.addAll(allFollowersNo);
        List<User> allUsers = userService.findAllUsers();
        List<User> followers = allUsers.stream()
                .filter(u -> messagedUsers.contains(u.getId()))
                .toList();
        int start = (int)pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), followers.size());
        return new PageImpl<>(followers.subList(start, end), pageable, followers.size()).getContent();
    }
    @Override
    public Message sendMessageService(String message, MultipartFile image, Integer receiverId, String token) throws EmptyMessageImageException, IOException {
        User sendUser=userService.findUserByToken(token);
        User receiveUser=userService.findUserById(receiverId);
        if((sendUser.getId()>0&& receiveUser.getId()>0)&&!sendUser.getId().equals(receiveUser.getId())){
            Message newMessage=new Message();
            newMessage.setText(message);
            if(image!=null){
                newMessage.setImage(image.getBytes());
            }
            newMessage.setSendUser(sendUser);
            newMessage.setReceiveUser(receiveUser);
            if(newMessage.getText().isEmpty()&&newMessage.getImage()==null){
                throw new EmptyMessageImageException("Empty Message cant accept ");
            }
            return messageRepository.save(newMessage);
        }
        throw new EmptyMessageImageException("Please send to the valid user");
    }

    @Override
    public List<Message> getAllTokenUserMessagesService(String token,Integer receiverUserId,Pageable pageable) throws CustomException {
        User user=userService.findUserByToken(token);
        if(user!=null){
            return messageRepository.findAllMessagesBySendUserIdAndReceiveUserId(user.getId(),receiverUserId,pageable);
        }
        throw new CustomException("There is no Such User");
    }

    @Override
    public List<Message> getAllReceiverUserMessagesService(String token, Integer receiverId,Pageable pageable) throws CustomException {
        User user=userService.findUserByToken(token);
        if(user.getId()>0&& receiverId>0){
            return messageRepository.findAllMessagesByReceiveUserIdAndSendUserId(user.getId(),receiverId,pageable);
        }
        throw new CustomException("There is no such User");
    }

    @Override
    public Long getAllReceiverMessagesCount(String token, Integer receiverId) throws CustomException {
        User user=userService.findUserByToken(token);
        Long count=messageRepository.countByReceiveUserIdAndSendUserId(user.getId(),receiverId);
        return count;
    }
    @Override
    public Long getAllSenderMessagesCount(String token, Integer receiverId) {
        User user=userService.findUserByToken(token);
        Long count=messageRepository.countByReceiveUserIdAndSendUserId(receiverId,user.getId());
        return count;
    }

    @Override
    public ResponseEntity<?> getAllMessages(String token, PageRequest pageRequest, Integer receiverId) {
        User user=userService.findUserByToken(token);
        List<Message>allTokenUserMessages=messageRepository.findAllMessagesBySendUserIdAndReceiveUserId(user.getId(),receiverId,pageRequest);
        List<Message>allReceiverUserMessages=messageRepository.findAllMessagesByReceiveUserIdAndSendUserId(user.getId(),receiverId,pageRequest);
        List<Message>allMessages=new ArrayList<>(allTokenUserMessages);
        allMessages.addAll(allReceiverUserMessages);
        return !allMessages.isEmpty()&&pageRequest.getPageSize()!=0 ?ResponseEntity.ok(allMessages): ResponseEntity.ok("There is no Messages"+pageRequest.getPageNumber());
    }
    @Override
    public List<Message> sendMessageToAllUsersService(String token, Long postId, List<Integer> checkedUser) {
        User tokenUser=userService.findUserByToken(token);
        Post post = postService.getPostByIdService(token, postId);
        List<Message> messages = new ArrayList<>();
        for (Integer userId : checkedUser) {
            User user = userService.findUserById(userId);
            Message message = new Message();
            message.setText("");
            message.setReceiveUser(user);
            message.setSendUser(tokenUser);
            message.setImage(post.getImage());
            messages.add(message);
        }
        return messageRepository.saveAll(messages);
    }
}
