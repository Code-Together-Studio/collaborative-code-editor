package ua.knu.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TextChangeDto {
    private Integer fileId;
    private String content;
}
