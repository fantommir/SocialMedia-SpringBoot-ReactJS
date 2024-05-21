package com.socialmedia.app.service;

import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {
    User findUserById(Integer userId);
    List<User> findAllUsers(Pageable pageable);
    User findUserByEmail(String email) throws CustomException;
    User followUserService(String token, Integer userId2) throws CustomException;
    User updateUserService(User user,String token);
    List<User>findAllUsers();
    List<User> searchUser(String name);
    User findUserByToken(String email) throws CustomException;
    User editProfile(String token,String name, String description);
}
