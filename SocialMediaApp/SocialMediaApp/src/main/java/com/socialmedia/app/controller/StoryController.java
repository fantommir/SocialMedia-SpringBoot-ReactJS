package com.socialmedia.app.controller;

import com.socialmedia.app.entity.Story;
import com.socialmedia.app.exceptions.CustomException;
import com.socialmedia.app.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class StoryController {
    @Autowired
    private StoryService storyService;
    @PostMapping("/app/allStory")
    public Story createStory(@RequestParam("description")String description,
                             @RequestParam("storyImage")MultipartFile storyImage,
                             @RequestHeader("Authorization")String token) throws CustomException, IOException {
        Story story=new Story();
        story.setDescription(description);
        story.setImage(storyImage.getBytes());
        return storyService.createStoryService(story,token);

    }
    @GetMapping("/app/allStory")
    public List<Story> getAllStories(@RequestHeader("Authorization")String token) throws CustomException {
        return storyService.getAllUserStories(token);
    }
    @GetMapping("/app/currentStory")
    public Story getCurrentUserStory(@RequestHeader("Authorization")String token) throws CustomException {
        return storyService.getCurrentUserStoryService(token);
    }
    @PutMapping("/app/currentStory")
    public Story updateCurrentUserStory(@RequestParam("description")String description,
            @RequestParam("storyImage")MultipartFile storyImage,
            @RequestHeader("Authorization")String token) throws CustomException, IOException {
        Story story=new Story();
        story.setDescription(description);
        story.setImage(storyImage.getBytes());
        Story storyy =storyService.updateCurrentUserStory(story,token);
        return storyy;
    }
    @DeleteMapping("/app/currentStory")
    public String deleteCurrentUserStory(@RequestHeader("Authorization")String token) throws CustomException {
        return storyService.deleteCurrentUserStoryService(token);
    }
}
