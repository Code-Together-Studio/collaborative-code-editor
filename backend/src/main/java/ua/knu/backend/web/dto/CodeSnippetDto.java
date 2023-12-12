package ua.knu.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class CodeSnippetDto {
    private Integer id;
    private String name;
    private String content;
    private Integer folderId;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
