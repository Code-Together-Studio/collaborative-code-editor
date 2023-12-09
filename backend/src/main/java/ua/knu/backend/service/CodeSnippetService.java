package ua.knu.backend.service;

import org.springframework.web.bind.annotation.RequestBody;
import ua.knu.backend.entity.CodeSnippet;

import java.util.List;

public interface CodeSnippetService {

    String getContentById(Integer id);

    CodeSnippet getCodeSnippetById(Integer id);

    void updateContentById(Integer id, String content);

    void saveInDb( Integer id, String content);

    void deleteById(Integer id);

    CodeSnippet create(Integer parentFolderId, String name);

    List<CodeSnippet> getAllCodeSnippedsFromFolder(Integer folderId);
}
