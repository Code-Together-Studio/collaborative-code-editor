package ua.knu.backend.repository;

import ua.knu.backend.entity.CodeSnippet;

import java.util.List;

public interface CodeSnippetCashableRepository {

    CodeSnippet getCodeSnippetById(Integer id);

    List<CodeSnippet> getCodeSnippetsFromFolder(Integer id);

    void saveChanges(CodeSnippet codeSnippet);
}
