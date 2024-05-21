package com.socialmedia.app.controller;

import com.socialmedia.app.dto.MessageResponseDto;
import com.socialmedia.app.dto.SelectedUsers;
import com.socialmedia.app.entity.Message;
import com.socialmedia.app.entity.Post;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @GetMapping("/app/getfollowers")
    public List<User>getAllFollowers(@RequestHeader("Authorization")String token,
                                     @RequestParam(defaultValue = "0")Integer page,
                                     @RequestParam(defaultValue = "1")Integer size) throws CustomException {
        PageRequest pageRequest=PageRequest.of(page,size);
        return messageService.getAllTokenFollowerObjects(token,pageRequest);
    }
    @PostMapping("/app/sendmessage")
    public ResponseEntity<?> sendMessage(@RequestParam("message") String message,
                                         @RequestParam(value = "image", required = false) MultipartFile image,
                                         @RequestParam("receiverId") Integer receiverId,
                                         @RequestHeader("Authorization") String token) {
        try {
            Message sentMessage = messageService.sendMessageService(message, image, receiverId, token);
            return ResponseEntity.ok(sentMessage);
        } catch (Exception e) {
            String errorMessage = "Failed to send message: " + e.getMessage();
            return ResponseEntity.badRequest().body(errorMessage); // Return an error response
        }
    }
    @GetMapping("/app/getsendermessage")
    public ResponseEntity<?>getAllUserMessages(@RequestHeader("Authorization")String token,
                                                   @RequestParam("receiverId")Integer receiverId,
                                                       @RequestParam(defaultValue = "0")Integer page,
                                                       @RequestParam(defaultValue = "1")Integer size){
        try{
            PageRequest pageRequest= PageRequest.of(page,size);
            return messageService.getAllMessages(token,pageRequest,receiverId);
        }
        catch (CustomException e){
            String errorMessage="Failed to get Messages "+e.getMessage();
            return ResponseEntity.badRequest().body(errorMessage);
        }
    }
    @PostMapping("/app/sendposttousers")
    public ResponseEntity<?>sendPostToAllUsers(@RequestHeader("Authorization")String token,
                                           @RequestBody SelectedUsers selectedUsers){
        return ResponseEntity.ok(messageService.sendMessageToAllUsersService(token,selectedUsers.getPostId(),selectedUsers.getCheckedUser()));
    }
}