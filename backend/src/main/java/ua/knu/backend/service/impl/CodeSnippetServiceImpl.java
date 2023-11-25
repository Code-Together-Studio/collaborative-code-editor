package ua.knu.backend.service.impl;

import org.springframework.stereotype.Service;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.repository.CodeSnippetCashableRepository;
import ua.knu.backend.repository.CodeSnippetRepository;
import ua.knu.backend.service.CodeSnippetService;

@Service
public class CodeSnippetServiceImpl implements CodeSnippetService {

    private final CodeSnippetRepository codeSnippetRepository;

    private final CodeSnippetCashableRepository codeSnippetCashableRepository;

    public CodeSnippetServiceImpl(CodeSnippetRepository codeSnippetRepository, CodeSnippetCashableRepository codeSnippetCashableRepository) {
        this.codeSnippetRepository = codeSnippetRepository;
        this.codeSnippetCashableRepository = codeSnippetCashableRepository;
    }

    @Override
    public String getContentById(Integer id) {
        return null;
    }

    @Override
    public void updateContentById(Integer id, String content) {

    }

    @Override
    public void saveInDb(CodeSnippet codeSnippet) {

    }
}
