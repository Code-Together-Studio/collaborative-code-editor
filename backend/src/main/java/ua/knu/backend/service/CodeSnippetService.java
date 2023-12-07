package ua.knu.backend.service;

import ua.knu.backend.entity.CodeSnippet;

import java.util.List;

public interface CodeSnippetService {

    String getContentById(Integer id);

    CodeSnippet getCodeSnippetById(Integer id);
    List<CodeSnippet> getCodeSnippetsByFolderId(Integer folderId);

    void updateContentById(Integer id, String content);

    void saveInDb(CodeSnippet codeSnippet);

    void deleteById(Integer id);
}
