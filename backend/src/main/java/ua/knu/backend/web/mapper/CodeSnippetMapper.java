package ua.knu.backend.web.mapper;

import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.web.dto.CodeSnippetDto;

import java.time.LocalDateTime;
import java.time.ZoneId;

public class CodeSnippetMapper {

    public static CodeSnippetDto toDto(CodeSnippet codeSnippet) {
        return new CodeSnippetDto(
                codeSnippet.getId(),
                codeSnippet.getName(),
                codeSnippet.getContent(),
                codeSnippet.getCreatedAt().toInstant().atZone(ZoneId.systemDefault())
                        .toLocalDateTime(),
                codeSnippet.getModifiedAt().toInstant().atZone(ZoneId.systemDefault())
                        .toLocalDateTime()
        );
    }
}
