package ua.knu.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.entity.Folder;
import ua.knu.backend.entity.Session;
import ua.knu.backend.entity.User;
import ua.knu.backend.repository.CodeSnippetRepository;
import ua.knu.backend.repository.FolderRepository;
import ua.knu.backend.repository.SessionRepository;
import ua.knu.backend.repository.UserRepository;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/test")
public class TestController {

    private final FolderRepository folderRepository;

    private final UserRepository userRepository;

    private final SessionRepository sessionRepository;

    private final CodeSnippetRepository codeSnippetRepository;

    public TestController(FolderRepository folderRepository, UserRepository userRepository, SessionRepository sessionRepository, CodeSnippetRepository codeSnippetRepository) {
        this.folderRepository = folderRepository;
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.codeSnippetRepository = codeSnippetRepository;
    }

    @GetMapping("/users")
    public String getAllUsers(){
        return userRepository.findAll().stream().map(User::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/folders")
    public String getAllFolders(){
        return folderRepository.findAll().stream().map(Folder::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/sessions")
    public String getAllSessions(){
        return sessionRepository.findAll().stream().map(Session::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/codeSnippets")
    public String getAllCodeSnippets(){
        return codeSnippetRepository.findAll().stream().map(CodeSnippet::toString).collect(Collectors.joining("\n"));
    }
}
