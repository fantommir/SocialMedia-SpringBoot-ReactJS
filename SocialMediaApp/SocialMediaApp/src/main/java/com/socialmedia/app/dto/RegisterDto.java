package com.socialmedia.app.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    private Integer id;
    private String name;
    private String description;
    private Long phoneNumber;
    private String email;
    private String gender;
    private String password;
}
