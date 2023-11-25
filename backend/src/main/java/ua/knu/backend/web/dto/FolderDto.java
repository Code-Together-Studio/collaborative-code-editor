package ua.knu.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FolderDto {
    private Integer id;
    private String name;
    private LocalDateTime createdAt;
}
