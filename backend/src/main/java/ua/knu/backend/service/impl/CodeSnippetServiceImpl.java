package ua.knu.backend.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.knu.backend.entity.ChangeOperation;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.entity.Project;
import ua.knu.backend.helpers.DiffResult;
import ua.knu.backend.repository.*;
import ua.knu.backend.service.CodeSnippetService;
import ua.knu.backend.web.dto.CodeSnippetDto;

import java.util.Date;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class CodeSnippetServiceImpl implements CodeSnippetService {

    private final CodeSnippetRepository codeSnippetRepository;

    private final CodeSnippetCashableRepository codeSnippetCashableRepository;

    private final ProjectRepository projectRepository;

    private final ChangeOperationRepository changeOperationRepository;
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(3);


    public CodeSnippetServiceImpl(CodeSnippetRepository codeSnippetRepository, CodeSnippetCashableRepository codeSnippetCashableRepository, ProjectRepository projectRepository, ChangeOperationRepository changeOperationRepository) {
        this.codeSnippetRepository = codeSnippetRepository;
        this.codeSnippetCashableRepository = codeSnippetCashableRepository;
        this.projectRepository = projectRepository;
        this.changeOperationRepository = changeOperationRepository;
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
    public String getContentByIdAndDataVersion(Integer id, Integer dataVersion) {
        var changeOperation =  changeOperationRepository.findByCodeSnippetIdAndDataVersion(id, dataVersion);
        if (changeOperation == null) {
            return null;
        }

        return changeOperation.getOriginalContent();
    }

    @Override
    public List<CodeSnippet> getAllCodeSnippedsFromFolder(Integer folderId) {
        return codeSnippetRepository.getAllByFolderId(folderId);
    }

    @Override
    public List<CodeSnippet> getAllRootCodeSnippedsFromProject(Integer projectId) {
        Project project = projectRepository.getById(projectId);
        Integer folderId = project.getHiddenRootFolderId();
        return codeSnippetRepository.getAllByFolderId(folderId);
    }

    @Override
    public void updateContentById(Integer id, String content) {
        codeSnippetCashableRepository.updateContentById(id, content);
    }

    @Override
    @Transactional
    public void saveInDb(Integer id, String content, DiffResult diff) {
        CodeSnippet codeSnippet = codeSnippetRepository.findById(id).get();
        Integer dataVersion = codeSnippet.getDataVersion();
        ChangeOperation changeOperation = new ChangeOperation(0, id, dataVersion, diff.getOperation(), diff.getStartIndex(), diff.getEndIndex(), codeSnippet.getContent());
        if (content == null) {
            String cacheContent = codeSnippetCashableRepository.getContentById(id);
            codeSnippet.setContent(cacheContent);
        }
        else {
            codeSnippet.setContent(content);
            codeSnippet.setDataVersion(dataVersion + 1);
        }
        codeSnippet.setModifiedAt(new Date());
        codeSnippetRepository.save(codeSnippet);
        changeOperationRepository.save(changeOperation);
    }


    public void scheduleSaveInDb(Integer id) {
        scheduler.schedule(() -> saveInDb(id, null, null), 10, TimeUnit.MINUTES);
    }

    @Override
    public CodeSnippet createInFolder(Integer parentFolderId, String name) {
        CodeSnippet codeSnippet = new CodeSnippet(name, parentFolderId);
        codeSnippet.setCreatedAt(new Date());
        codeSnippet.setModifiedAt(new Date());
        codeSnippet.setContent("");
        return codeSnippetRepository.save(codeSnippet);
    }

    @Override
    public CodeSnippet createInProject(Integer parentProjectId, String name) {
        Project project = projectRepository.getById(parentProjectId);
        return createInFolder(project.getHiddenRootFolderId(), name);
    }

    @Override
    public void deleteById(Integer id) {
        codeSnippetRepository.deleteById(id);
        codeSnippetCashableRepository.deleteById(id);
    }
}
