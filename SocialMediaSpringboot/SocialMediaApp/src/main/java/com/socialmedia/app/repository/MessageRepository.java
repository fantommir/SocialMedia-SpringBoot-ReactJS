package com.socialmedia.app.repository;

import com.socialmedia.app.entity.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Long> {
    @Query("FROM Message m WHERE m.sendUser.id = :sendUserId AND m.receiveUser.id = :receiveUserId")
    List<Message> findAllMessagesBySendUserIdAndReceiveUserId(@Param("sendUserId") Integer sendUserId, @Param("receiveUserId") Integer receiveUserId,Pageable pageable);
    List<Message> findAllMessagesByReceiveUserIdAndSendUserId(Integer receiverId, Integer id, Pageable pageable);
    @Query("SELECT COUNT(*) FROM Message m WHERE m.sendUser.id = :sendUserId AND m.receiveUser.id = :receiveUserId")
    Long countByReceiveUserIdAndSendUserId(@Param("receiveUserId") Integer sendUserId, @Param("sendUserId") Integer receiveUserId);
}
