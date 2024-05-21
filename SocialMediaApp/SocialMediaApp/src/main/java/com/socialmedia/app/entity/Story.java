package com.socialmedia.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[]image;
    @ManyToOne
    @JoinColumn(name = "uid_fk")
    private User user;
    @CreationTimestamp
    private LocalDateTime createdAt;
}
