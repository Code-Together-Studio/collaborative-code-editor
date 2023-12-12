package ua.knu.backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import ua.knu.backend.service.CodeSnippetService;
import ua.knu.backend.web.dto.TextChangeDTO;

@Controller
public class WebSocketController {

    private final CodeSnippetService codeSnippetService;

    public WebSocketController(CodeSnippetService codeSnippetService) {
        this.codeSnippetService = codeSnippetService;
    }

    @MessageMapping("/change")
    @SendTo("/topic/updates")
    public void handleTextChange(TextChangeDTO dto) {
        // codeSnippetService.getCodeSnippetById(fileId);
        codeSnippetService.updateContentById(dto.getFileId(), dto.getContent());
    }
}
