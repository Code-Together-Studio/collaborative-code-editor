package ua.knu.backend.service;

import ua.knu.backend.entity.CodeSnippet;

import java.util.List;

public interface CodeSnippetService {

    String getContentById(Integer id);

    CodeSnippet getCodeSnippetById(Integer id);

    void updateContentById(Integer id, String content);

    void saveInDb( Integer id, String content);

    void deleteById(Integer id);

    CodeSnippet createInFolder(Integer parentFolderId, String name);

    List<CodeSnippet> getAllCodeSnippedsFromFolder(Integer folderId);

    List<CodeSnippet> getAllRootCodeSnippedsFromProject(Integer projectId);

    CodeSnippet createInProject(Integer parentProjectId, String name);
}
