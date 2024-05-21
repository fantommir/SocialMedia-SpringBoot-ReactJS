package com.socialmedia.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[]image;
    @ManyToOne
    @JoinColumn(name = "sendId_fk")
    private User sendUser;
    @ManyToOne
    @JoinColumn(name = "receiverId_fk")
    private User receiveUser;
}
