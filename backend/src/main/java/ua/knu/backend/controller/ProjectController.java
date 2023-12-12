package ua.knu.backend.controller;

import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ua.knu.backend.exception.project.ProjectRequiresAuthException;
import ua.knu.backend.service.ProjectService;
import ua.knu.backend.web.dto.ProjectDto;
import ua.knu.backend.web.mapper.ProjectMapper;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/all")
    public List<ProjectDto> getAllProjects() {
        return projectService.getAllProjects().stream().map(ProjectMapper::toDto).toList();
    }

    @GetMapping("/not-required-authentication")
    public List<ProjectDto> getNotRequiredAuthenticationProjects() {
        return projectService.getNotRequiredAuthenticationProjects().stream().map(ProjectMapper::toDto).toList();
    }

    @GetMapping("/{id}")
    @SneakyThrows
    public ProjectDto getProjectById(@PathVariable Integer id, Authentication authentication) {
        ProjectDto project = ProjectMapper.toDto(projectService.getProjectById(id));

        /*if (project.isAuthenticatedOnly() && (authentication == null || !authentication.isAuthenticated())) {
            throw new ProjectRequiresAuthException(project.getTitle());
        }
*/
        return project;
    }

    @PostMapping("/create")
    public ProjectDto createProject(
            @RequestParam String title,
            @RequestParam boolean authenticated_only
    ) {
        return ProjectMapper.toDto(projectService.createProject(title, authenticated_only));
    }

    @DeleteMapping("/{id}")
    public void deleteProjectById(@PathVariable Integer id) {
        projectService.deleteProject(id);
    }
}
