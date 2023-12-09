package ua.knu.backend.service.impl;

import org.springframework.stereotype.Service;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.repository.CodeSnippetCashableRepository;
import ua.knu.backend.repository.CodeSnippetRepository;
import ua.knu.backend.repository.FolderRepository;
import ua.knu.backend.service.CodeSnippetService;

import java.util.Date;
import java.util.List;

@Service
public class CodeSnippetServiceImpl implements CodeSnippetService {

    private final CodeSnippetRepository codeSnippetRepository;

    private final CodeSnippetCashableRepository codeSnippetCashableRepository;

    public CodeSnippetServiceImpl(CodeSnippetRepository codeSnippetRepository, FolderRepository folderRepository, CodeSnippetCashableRepository codeSnippetCashableRepository) {
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
    public List<CodeSnippet> getAllCodeSnippedsFromFolder(Integer folderId) {
        return codeSnippetRepository.getAllByFolderId(folderId);
    }

    @Override
    public void updateContentById(Integer id, String content) {
        codeSnippetCashableRepository.updateContentById(id, content);
    }

    @Override
    public void saveInDb(Integer id, String content) {
        CodeSnippet codeSnippet = codeSnippetRepository.getById(id);
        codeSnippet.setModifiedAt(new Date());
        codeSnippetRepository.save(codeSnippet);
    }

    @Override
    public CodeSnippet create(Integer parentFolderId, String name) {
        CodeSnippet codeSnippet = new CodeSnippet(name, parentFolderId);
        codeSnippet.setCreatedAt(new Date());
        codeSnippet.setModifiedAt(new Date());
        codeSnippet.setContent("");
        return codeSnippetRepository.save(codeSnippet);
    }

    @Override
    public void deleteById(Integer id) {
        codeSnippetRepository.deleteById(id);
        codeSnippetCashableRepository.deleteById(id);
    }
}
