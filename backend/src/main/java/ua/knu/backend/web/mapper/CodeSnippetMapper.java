package ua.knu.backend.web.mapper;

import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.web.dto.CodeSnippetDto;

import java.time.ZoneId;
import java.util.Date;

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

    public static CodeSnippet toEntity(CodeSnippetDto codeSnippetDto) {
        return new CodeSnippet(
                codeSnippetDto.getId(),
                codeSnippetDto.getName(),
                codeSnippetDto.getContent(),
                Date.from(codeSnippetDto.getCreatedAt().atZone(ZoneId.systemDefault()).toInstant()),
                Date.from(codeSnippetDto.getModifiedAt().atZone(ZoneId.systemDefault()).toInstant()),
                -1
        );
    }
}
