package ua.knu.backend.web.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CodeSnippetCreateDto {
    private String name;
    private String content;
}
