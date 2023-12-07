package ua.knu.backend.service.impl;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import ua.knu.backend.entity.Folder;
import ua.knu.backend.entity.Project;
import ua.knu.backend.exception.folder.FolderByIdNotFoundException;
import ua.knu.backend.exception.folder.HiddenRootFolderNotFoundException;
import ua.knu.backend.exception.project.ProjectByIdNotFoundException;
import ua.knu.backend.exception.project.ProjectWithTitleExistsException;
import ua.knu.backend.repository.CodeSnippetRepository;
import ua.knu.backend.repository.FolderRepository;
import ua.knu.backend.repository.ProjectRepository;
import ua.knu.backend.service.FolderService;

import java.util.List;

@Service
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;

    private final ProjectRepository projectRepository;

    private final CodeSnippetRepository codeSnippetRepository;

    public FolderServiceImpl(FolderRepository folderRepository, ProjectRepository projectRepository, CodeSnippetRepository codeSnippetRepository) {
        this.folderRepository = folderRepository;
        this.projectRepository = projectRepository;
        this.codeSnippetRepository = codeSnippetRepository;
    }

    @Override
    public Folder getFolderById(Integer id) {
        return folderRepository.findById(id).orElseThrow(FolderByIdNotFoundException::new);
    }

    @Override
    public Folder createFolder(Integer parentFolderId, String name) {
        Folder parentFolder = getFolderById(parentFolderId);
        throwExceptionIfParentFolderContainsFolderWithName(parentFolder, name);
        Folder createdFolder = new Folder(name, parentFolder);
        parentFolder.addChild(createdFolder);
        return folderRepository.save(createdFolder);
    }

    @Override
    public Folder deleteFolder(Integer id) {
        Folder currentFolder = getFolderById(id);
        codeSnippetRepository.deleteAllByFolderId(id);
        Hibernate.initialize(currentFolder);
        currentFolder.getChildrenFolders().stream().map(Folder::getId).forEach(this::deleteFolder);
        return currentFolder;
    }

    @Override
    public List<Folder> getProjectRootFolders(Integer projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(ProjectByIdNotFoundException::new);
        return getChildFolders(project.getHiddenRootFolderId());
    }

    @Override
    public List<Folder> getProjectRootFolders(String projectTitle) {
        Project project = projectRepository.findByTitle(projectTitle).orElseThrow(ProjectByIdNotFoundException::new);
        return getChildFolders(project.getHiddenRootFolderId());
    }

    @Override
    public List<Folder> getChildFolders(Integer parentFolderId) {
        Folder folder = folderRepository.findById(parentFolderId).orElseThrow(HiddenRootFolderNotFoundException::new);
        Hibernate.initialize(folder.getChildrenFolders());
        return folder.getChildrenFolders();
    }

    private void throwExceptionIfParentFolderContainsFolderWithName(Folder folder, String name) {
        Hibernate.initialize(folder.getParentFolder());
        if (folder.getChildrenFolders().stream().map(Folder::getName).anyMatch(childName -> childName.equals(name)))
            throw new ProjectWithTitleExistsException(name);
    }
}
