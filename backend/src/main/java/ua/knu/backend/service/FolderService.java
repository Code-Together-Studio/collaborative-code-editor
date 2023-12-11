package ua.knu.backend.service;

import ua.knu.backend.entity.Folder;

import java.util.List;

public interface FolderService {

    Folder getFolderById(Integer id);

    Folder createFolder(Integer parentFolderId, String name);

    Folder createRootFolder(String project_title);

    Folder deleteFolder(Integer id);

    List<Folder> getProjectRootFolders(Integer projectId);

    List<Folder> getProjectRootFolders(String projectTitle);

    List<Folder> getChildFolders(Integer parentFolderId);

    Folder createFolderInProject(Integer parentProjectId, String name);
}
