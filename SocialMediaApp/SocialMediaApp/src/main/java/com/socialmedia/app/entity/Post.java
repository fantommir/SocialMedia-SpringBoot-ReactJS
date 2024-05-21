package com.socialmedia.app.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
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
    @ManyToMany
    @JoinTable(name = "likesTab",
            joinColumns = @JoinColumn(name = "pid_fk"),
            inverseJoinColumns = @JoinColumn(name = "uid_fk"))
    private List<User> likes=new ArrayList<>();
}
