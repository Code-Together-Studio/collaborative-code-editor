package ua.knu.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ProjectDto {
    private Integer id;
    private String title;
    private LocalDateTime createdAt;
}
