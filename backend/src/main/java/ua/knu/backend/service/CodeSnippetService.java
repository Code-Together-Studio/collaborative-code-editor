package ua.knu.backend.service;

import org.springframework.data.util.Pair;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.helpers.DiffResult;

import java.util.List;

public interface CodeSnippetService {

    String getContentById(Integer id);
    String getContentByIdAndDataVersion(Integer id, Integer dataVersion);
    DiffResult getNewDiffResult(Integer id, Integer dataVersion, DiffResult diffResult);

    CodeSnippet getCodeSnippetById(Integer id);

    void updateContentById(Integer id, String content);

    void saveInDb( Integer id, String content, DiffResult diff);

    void deleteById(Integer id);

    CodeSnippet createInFolder(Integer parentFolderId, String name);

    List<CodeSnippet> getAllCodeSnippedsFromFolder(Integer folderId);

    List<CodeSnippet> getAllRootCodeSnippedsFromProject(Integer projectId);

    CodeSnippet createInProject(Integer parentProjectId, String name);
}
