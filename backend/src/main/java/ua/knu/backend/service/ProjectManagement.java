package ua.knu.backend.service;

public interface ProjectManagement {
    void createProject(String projectName);

    void createFolder(Integer parentFolderId, String folderName);

    void createFile(Integer folderId, String fileName);

    void deleteFile(Integer fileId);
}
