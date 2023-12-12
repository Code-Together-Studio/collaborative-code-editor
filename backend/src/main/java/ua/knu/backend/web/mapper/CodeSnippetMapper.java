package ua.knu.backend.web.mapper;

import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.web.dto.CodeSnippetCreateDto;
import ua.knu.backend.web.dto.CodeSnippetDto;

import java.time.ZoneId;
import java.util.Date;

public class CodeSnippetMapper {

    public static CodeSnippetDto toDto(CodeSnippet codeSnippet) {
        return new CodeSnippetDto(
                codeSnippet.getId(),
                codeSnippet.getName(),
                codeSnippet.getContent(),
                codeSnippet.getFolderId(),
                codeSnippet.getCreatedAt().toInstant().atZone(ZoneId.systemDefault())
                        .toLocalDateTime(),
                codeSnippet.getModifiedAt().toInstant().atZone(ZoneId.systemDefault())
                        .toLocalDateTime()
        );
    }
}
