package com.socialmedia.app.dto;

import com.socialmedia.app.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDto {
    private List<Message>allMsgs;
    private String text;
}
