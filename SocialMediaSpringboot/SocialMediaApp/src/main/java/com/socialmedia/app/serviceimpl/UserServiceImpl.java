package com.socialmedia.app.serviceimpl;

import com.socialmedia.app.auth.JWTTokenProvider;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.repository.UserRepository;
import com.socialmedia.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public User findUserById(Integer userId) throws CustomException {
        Optional<User> user=userRepository.findById(userId);
        if(!user.isPresent()){
            throw new CustomException("User Not found with this id "+userId);
        }
        return user.get();
    }

    @Override
    public List<User> findAllUsers(Pageable pageable) {
        List<User>allUsers=userRepository.findAll(pageable).getContent();
        return allUsers;
    }

    @Override
    public User findUserByEmail(String email) throws CustomException {
        User user=userRepository.findByEmail(email);
        if(user!=null){
            return user;
        }
        throw new CustomException("User not found with this email "+email);
    }
    @Override
    public User editProfile(String token,String name, String description) {
        User user=findUserByToken(token);
        Optional<User> dbUser=userRepository.findById(user.getId());
        if(dbUser.isPresent()){
            User newUser=dbUser.get();
            newUser.setName(name);
            newUser.setDescription(description);
            return userRepository.save(newUser);
        }
        throw new CustomException("user not found with this token");
    }
    @Override
    public User followUserService( String token,Integer userId2) throws CustomException {
        User tokenUser=findUserByToken(token);
        User user1=findUserById(tokenUser.getId());
        User user2=findUserById(userId2);
        if(user1.getId().equals(user2.getId())){
            throw new CustomException("You cant follow yourself");
        }
        if(!user1.getFollowings().contains(user2.getId())){
            user1.getFollowings().add(user2.getId());
            user2.getFollowers().add(user1.getId());
        }
        else{
            user1.getFollowings().remove(user2.getId());
            user2.getFollowers().remove(user1.getId());
        }
        userRepository.save(user1);
        userRepository.save(user2);
        user1.setPassword(null);
        return user1;
    }

    @Override
    public User updateUserService(User user, String token) throws CustomException {
        User tokenUser=findUserByToken(token);
        User dbUser=findUserById(tokenUser.getId());
        if(dbUser==null){
            throw new CustomException("User Not Found with this token Id " +tokenUser.getId());
        }
        if(user.getName()!=null){
            dbUser.setName(user.getName());
        }
        if(user.getPhoneNumber()!=null){
            dbUser.setPhoneNumber(user.getPhoneNumber());
        }
        if(user.getEmail()!=null){
            dbUser.setEmail(user.getEmail());
        }
        if(user.getGender()!=null){
            dbUser.setGender(user.getGender());
        }
        if(user.getPassword()!=null){
            dbUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        if(user.getProfile()!=null){
            dbUser.setProfile(user.getProfile());
        }
        if(user.getDescription()!=null){
            dbUser.setDescription(user.getDescription());
        }
        if(user.getBackground()!=null){
            dbUser.setBackground(user.getBackground());
        }
        User updatedUser=userRepository.save(dbUser);
        updatedUser.setPassword(null);
        return updatedUser;
    }

    @Override
    public List<User> searchUser(String name) {
        List<User>allSearchedUsers= userRepository.searchUser(name);
        return allSearchedUsers;
    }

    @Override
    public User findUserByToken(String token) throws CustomException {
        String email= JWTTokenProvider.getEmailFromJwtToken(token);
        User user=findUserByEmail(email);
        return user;
    }
    @Override
    public List<User>findAllUsers(){
        return userRepository.findAll();
    }
}