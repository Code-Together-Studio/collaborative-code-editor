package ua.knu.backend.service.impl;

import org.springframework.stereotype.Service;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.repository.CodeSnippetCashableRepository;
import ua.knu.backend.repository.CodeSnippetRepository;
import ua.knu.backend.service.CodeSnippetService;

import java.util.Date;

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
        return codeSnippetCashableRepository.getContentById(id);
    }

    @Override
    public CodeSnippet getCodeSnippetById(Integer id) {
        return codeSnippetRepository.findById(id).get();
    }

    @Override
    public void updateContentById(Integer id, String content) {
        codeSnippetCashableRepository.updateContentById(id, content);
    }

    @Override
    public void saveInDb(CodeSnippet codeSnippet) {
        codeSnippet.setModifiedAt(new Date());
        codeSnippet.setFolderId(codeSnippetRepository.findById(codeSnippet.getId()).get().getFolderId());
        codeSnippetRepository.save(codeSnippet);
    }

    @Override
    public void deleteById(Integer id) {
        codeSnippetRepository.deleteById(id);
        codeSnippetCashableRepository.deleteById(id);
    }
}
