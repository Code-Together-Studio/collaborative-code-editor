package ua.knu.backend.service.impl;

import jakarta.persistence.criteria.CriteriaBuilder;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.entity.Folder;
import ua.knu.backend.entity.Project;
import ua.knu.backend.exception.ParentFolderIdIsIncorrectException;
import ua.knu.backend.repository.CodeSnippetRepository;
import ua.knu.backend.repository.FolderRepository;
import ua.knu.backend.repository.ProjectRepository;
import ua.knu.backend.service.ProjectManagement;

public class ProjectManagementImpl implements ProjectManagement {

    private final ProjectRepository projectRepository;

    private final FolderRepository folderRepository;

    private final CodeSnippetRepository codeSnippetRepository;

    public ProjectManagementImpl(ProjectRepository projectRepository, FolderRepository folderRepository, CodeSnippetRepository codeSnippetRepository) {
        this.projectRepository = projectRepository;
        this.folderRepository = folderRepository;
        this.codeSnippetRepository = codeSnippetRepository;
    }

    @Override
    public void createProject(String projectName) {
        projectRepository.save(new Project(projectName));
    }

    @Override
    public void createFolder(Integer parentFolderId, String folderName) {
        Folder parentFolder = folderRepository.findById(parentFolderId).orElseThrow(ParentFolderIdIsIncorrectException::new);
        folderRepository.save(new Folder(folderName, parentFolder));
    }

    @Override
    public void createFile(Integer folderId, String fileName) {
        if (isFolderByIdExist(folderId))
            codeSnippetRepository.save(new CodeSnippet(fileName, folderId ));
        throw new ParentFolderIdIsIncorrectException();
    }

    @Override
    public void deleteFile(Integer fileId) {
        codeSnippetRepository.deleteById(fileId);
    }

    private boolean isFolderByIdExist(Integer folderId){
        return folderRepository.existsById(folderId);
    }
}
