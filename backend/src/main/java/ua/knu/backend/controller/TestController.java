package ua.knu.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.entity.Folder;
import ua.knu.backend.entity.User;
import ua.knu.backend.repository.CodeSnippetRepository;
import ua.knu.backend.repository.FolderRepository;
import ua.knu.backend.repository.ProjectRepository;
import ua.knu.backend.repository.UserRepository;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/test")
public class TestController {

    private final FolderRepository folderRepository;

    private final UserRepository userRepository;

    private final ProjectRepository projectRepository;

    private final CodeSnippetRepository codeSnippetRepository;

    public TestController(FolderRepository folderRepository, UserRepository userRepository, ProjectRepository projectRepository, CodeSnippetRepository codeSnippetRepository) {
        this.folderRepository = folderRepository;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.codeSnippetRepository = codeSnippetRepository;
    }

    @GetMapping("/users")
    public String getAllUsers() {
        return userRepository.findAll().stream().map(User::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/folders")
    public String getAllFolders() {
        return folderRepository.findAll().stream().map(Folder::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/projects")
    public String getAllProjects() {
        return "OK 200";
        //return projectRepository.findAll().stream().map(Project::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/codeSnippets")
    public String getAllCodeSnippets() {
        return codeSnippetRepository.findAll().stream().map(CodeSnippet::toString).collect(Collectors.joining("\n"));
    }
}
