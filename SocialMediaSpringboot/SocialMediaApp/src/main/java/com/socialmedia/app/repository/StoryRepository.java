package com.socialmedia.app.repository;

import com.socialmedia.app.entity.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StoryRepository extends JpaRepository<Story,Long> {
    @Query("from Story s where s.user.id!=:id")
    List<Story>findAllStories(Integer id);
    Story findStoryByUserId(Integer id);
    Story findByUserId(Integer id);
}
