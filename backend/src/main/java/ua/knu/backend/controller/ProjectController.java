package ua.knu.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.knu.backend.entity.Project;
import ua.knu.backend.service.ProjectService;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @GetMapping("/all")
    public String getAllProjects() {
        return projectService.getAllProjects().stream().map(Project::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/not-required-authentication")
    public String getNotRequiredAuthenticationProjects() {
        return projectService.getNotRequiredAuthenticationProjects().stream().map(Project::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/{title}")
    public String getProjectByTitle(@PathVariable String title) {
        return projectService.getProjectByTitle(title).toString();
    }

    @GetMapping("/{id}")
    public String getProjectById(@PathVariable Integer id) {
        return projectService.getProjectById(id).toString();
    }

    @PostMapping("/create")
    public String createProject(
            @RequestParam String title,
            @RequestParam boolean authenticated_only
    ){
        return projectService.createProject(title, authenticated_only).toString();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteProjectById(@PathVariable Integer id){
        projectService.deleteProject(id);
        return "200 OK";
    }

    @DeleteMapping("/delete/{title}")
    public String deleteProjectByTitle(@PathVariable String title){
        projectService.deleteProject(title);
        return "200 OK";
    }


}
