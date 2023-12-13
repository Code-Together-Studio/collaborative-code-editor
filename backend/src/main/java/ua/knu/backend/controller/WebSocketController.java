package ua.knu.backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import ua.knu.backend.service.CodeSnippetService;
import ua.knu.backend.web.dto.TextChangeDto;

@Controller
public class WebSocketController {

    private final CodeSnippetService codeSnippetService;

    public WebSocketController(CodeSnippetService codeSnippetService) {
        this.codeSnippetService = codeSnippetService;
    }

    @MessageMapping("/change")
    @SendTo("/topic/updates")
    public TextChangeDto handleTextChange(TextChangeDto dto) {
        // codeSnippetService.updateContentById(dto.getFileId(), dto.getContent());
        codeSnippetService.saveInDb(dto.getFileId(), dto.getContent());
        return dto;
    }
}