package com.socialmedia.app.service;

import com.socialmedia.app.entity.Story;
import com.socialmedia.app.exceptions.CustomException;

import java.util.List;

public interface StoryService {
    Story createStoryService(Story story,String token) throws CustomException;
    List<Story> getAllUserStories(String token) throws CustomException;
    Story getCurrentUserStoryService(String token) throws CustomException;
    Story updateCurrentUserStory(Story story,String token) throws CustomException;

    String deleteCurrentUserStoryService(String token) throws CustomException;
}
