package ua.knu.backend.service.impl;

import org.springframework.stereotype.Service;
import ua.knu.backend.entity.Folder;
import ua.knu.backend.entity.Project;
import ua.knu.backend.exception.project.ProjectByIdNotFoundException;
import ua.knu.backend.exception.project.ProjectByNameNotFoundException;
import ua.knu.backend.exception.project.ProjectWithTitleExistsException;
import ua.knu.backend.repository.FolderRepository;
import ua.knu.backend.repository.ProjectRepository;
import ua.knu.backend.service.FolderService;
import ua.knu.backend.service.ProjectService;

import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    private final FolderService folderService;

    public ProjectServiceImpl(ProjectRepository projectRepository, FolderService folderService) {
        this.projectRepository = projectRepository;
        this.folderService = folderService;
    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public List<Project> getNotRequiredAuthenticationProjects() {
        return projectRepository.getNotRequiredAuthenticationProjects();
    }

    @Override
    public Project getProjectByTitle(String title) {
        return projectRepository.findByTitle(title).orElseThrow(ProjectByNameNotFoundException::new);
    }

    @Override
    public Project getProjectById(Integer id) {
        return projectRepository.findById(id).orElseThrow(ProjectByIdNotFoundException::new);
    }

    @Override
    public Project createProject(String title, boolean authenticated_only) {
        throwExceptionIfProjectWithTitleMissing(title);
        Folder rootFolder = folderService.createRootFolder(title);
        return projectRepository.save(new Project(title, authenticated_only, rootFolder.getId()));
    }

    @Override
    public void deleteProject(Integer id) {
        Integer rootFolderId = getProjectById(id).getHiddenRootFolderId();
        if (rootFolderId != null)
            folderService.deleteFolder(rootFolderId);
        projectRepository.deleteById(id);
    }

    @Override
    public void deleteProject(String title) {
        deleteProject(getProjectByTitle(title).getId());
    }

    private void throwExceptionIfProjectWithTitleMissing(String title) {
        if (projectRepository.findByTitle(title).isPresent())
            throw new ProjectWithTitleExistsException(title);
    }
}
