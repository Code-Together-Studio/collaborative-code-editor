package ua.knu.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TextChangeDTO {
    private Integer fileId;
    private String content;
}