package ua.knu.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ProjectDto {
    private Integer id;
    private String title;
    private Integer rootFolderId;
    private LocalDateTime createdAt;
    private boolean authenticatedOnly;
}
