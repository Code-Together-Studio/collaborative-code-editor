package ua.knu.backend.controller;

import org.springframework.web.bind.annotation.*;
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
    public ProjectDto getProjectById(@PathVariable Integer id) {
        return ProjectMapper.toDto(projectService.getProjectById(id));
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
