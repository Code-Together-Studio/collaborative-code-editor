package ua.knu.backend.repository.impl;

import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.repository.CodeSnippetCashableRepository;
import ua.knu.backend.repository.CodeSnippetRepository;

import java.util.List;

public class CodeSnippetCashableRepositoryImpl implements CodeSnippetCashableRepository {

    @Override
    public CodeSnippet getCodeSnippetById(Integer id) {
        return null;
    }

    @Override
    public List<CodeSnippet> getCodeSnippetsFromFolder(Integer id) {
        return null;
    }

    @Override
    public void saveChanges(CodeSnippet codeSnippet) {

    }
}
