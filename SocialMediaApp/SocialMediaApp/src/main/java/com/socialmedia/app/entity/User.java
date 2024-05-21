package com.socialmedia.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String description;
    private Long phoneNumber;
    private String email;
    private String gender;
    private String password;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[]profile;
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[]background;
    private Set<Integer> followers=new HashSet<>();
    private Set<Integer>followings=new HashSet<>();
}
