package ua.knu.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.knu.backend.service.CodeSnippetService;

@RestController
@RequestMapping("/code-snippet")
public class CodeSnippetController {

    private final CodeSnippetService codeSnippetService;

    public CodeSnippetController(CodeSnippetService codeSnippetService) {
        this.codeSnippetService = codeSnippetService;
    }
}
