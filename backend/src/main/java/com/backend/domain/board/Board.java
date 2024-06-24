package com.backend.domain.board;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class Board {
    private Integer id;
    private Integer userId;
    private String title;
    private String content;
    private LocalDateTime inserted;
    private String nickName;

    private List<BoardFile> boardFileList;
    private Integer numberOfImages;
    private Integer numberOfLikes;
    private Integer numberOfComments;
}