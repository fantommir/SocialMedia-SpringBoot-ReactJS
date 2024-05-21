package com.socialmedia.app.controller;

import com.socialmedia.app.dto.RegisterDto;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @GetMapping("/allUsers")
    public List<User>getAllUsers(@RequestParam(defaultValue = "0")Integer page,@RequestParam(defaultValue = "1")Integer size){
       PageRequest pageRequest=PageRequest.of(page,size);
       return userService.findAllUsers(pageRequest);
    }
    @PutMapping("/app/allUsers/update")
    public User updateUser(@ModelAttribute RegisterDto registerDto,
                           @RequestParam(value = "profile",required = false)MultipartFile profile,
                           @RequestParam(value = "background",required = false)MultipartFile background,
                           @RequestHeader("Authorization")String token) throws CustomException, IOException {
        User user=new User();
        user.setName(registerDto.getName());
        user.setPhoneNumber(registerDto.getPhoneNumber());
        user.setEmail(registerDto.getEmail());
        user.setGender(registerDto.getGender());
        if(user.getPassword()!=null&&registerDto.getPassword()!=null){
            user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        }
        if((user.getProfile()==null&&profile==null)){
            user.setProfile(null);
        }
        else if(profile.getBytes().length>0){
            user.setProfile(profile.getBytes());
        }
        if(user.getBackground()==null&&background==null){
            user.setBackground(null);
        }
        else if(background.getBytes().length>0){
            user.setBackground(background.getBytes());
        }
        user.setDescription(registerDto.getDescription());
        User updatedUser=userService.updateUserService(user,token);
        if(updatedUser!=null){
            return updatedUser;
        }
        throw new CustomException("Unable to Update the User ");
    }
    @PutMapping("/app/users/edit")
    public User editProfile(@RequestHeader("Authorization")String token,
                            @RequestParam("name")String name,
                            @RequestParam("description")String description){
        return userService.editProfile(token,name,description);
    }
    @PutMapping("/app/allUsers/follow")
    public User followUser(
                           @RequestParam("userId") Integer userId,
                           @RequestHeader("Authorization")String token) throws CustomException {
        System.out.println("entered this");
        return userService.followUserService(token,userId);
    }
    @GetMapping("/searchedUsers")
    public List<User>searchUsers(@RequestParam("searchUserName")String searchUserName){
        List<User>allSearchedUsers=userService.searchUser(searchUserName);
        for (User sUser:allSearchedUsers){
            sUser.setPassword(null);
        }
        return allSearchedUsers;
    }
    @GetMapping("/app/tokenUser")
    public User getTokenUser(@RequestHeader("Authorization")String token) throws CustomException {
        User user=userService.findUserByToken(token);
        return user;
    }
}
