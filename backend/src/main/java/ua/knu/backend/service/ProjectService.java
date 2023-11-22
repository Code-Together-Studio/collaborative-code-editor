package ua.knu.backend.service;

import ua.knu.backend.entity.Project;

import java.util.List;

public interface ProjectService {

    //set role
    List<Project> getAllProjects();

    List<Project> getNotRequiredAuthenticationProjects();

    Project getProjectByTitle(String title);

    Project getProjectById(Integer id);

    Project createProject(String title, boolean authenticated_only);

    void deleteProject(Integer id);

    void deleteProject(String title);
}
