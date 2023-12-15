package ua.knu.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InitDto {
    private Integer projectId;
    private Integer fileId;
}

