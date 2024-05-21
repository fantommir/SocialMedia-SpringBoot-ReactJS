package com.socialmedia.app.serviceimpl;

import com.socialmedia.app.entity.Story;
import com.socialmedia.app.entity.User;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.repository.StoryRepository;
import com.socialmedia.app.service.StoryService;
import com.socialmedia.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {
    @Autowired
    private UserService userService;
    @Autowired
    private StoryRepository storyRepository;
    @Override
    public Story createStoryService(Story story, String token) throws CustomException {
        User user=userService.findUserByToken(token);
        Story newStory=new Story();
        newStory.setDescription(story.getDescription());
        newStory.setImage(story.getImage());
        newStory.setUser(user);
        Story savedStory= storyRepository.save(newStory);
        user.setPassword(null);
        savedStory.setUser(user);
        return savedStory;
    }
    @Override
    public List<Story> getAllUserStories(String token) throws CustomException {
        User user=userService.findUserByToken(token);
        List<Story>allUsersStories=storyRepository.findAllStories(user.getId());
        return allUsersStories;
    }

    @Override
    public Story getCurrentUserStoryService(String token) throws CustomException {
        User user=userService.findUserByToken(token);
        Story story= storyRepository.findStoryByUserId(user.getId());
        return story;
    }


    @Override
    public Story updateCurrentUserStory(Story story,String token) throws CustomException {
        User user=userService.findUserByToken(token);
        Story existingStory = storyRepository.findByUserId(user.getId());
        if (existingStory == null) {
            throw new CustomException("Story not found for the current user");
        }
        existingStory.setDescription(story.getDescription());
        existingStory.setImage(story.getImage());
        return storyRepository.save(existingStory);
    }

    @Override
    public String deleteCurrentUserStoryService(String token) throws CustomException {
        User user=userService.findUserByToken(token);
        Story existingStory=storyRepository.findStoryByUserId(user.getId());
        if (existingStory==null){
            throw new CustomException("Story not found with the UserId");
        }
        storyRepository.delete(existingStory);
        return "Successfully Deleted the Story! ";
    }
}
