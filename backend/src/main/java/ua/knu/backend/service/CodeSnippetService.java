package ua.knu.backend.service;

import ua.knu.backend.entity.CodeSnippet;

public interface CodeSnippetService {

    String getContentById(Integer id);

    void updateContentById(Integer id, String content);

    void saveInDb(CodeSnippet codeSnippet);
}
