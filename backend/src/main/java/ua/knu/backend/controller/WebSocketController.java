package ua.knu.backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import ua.knu.backend.helpers.DiffResult;
import ua.knu.backend.helpers.DiffService;
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
    public TextChangeDto handleTextChange(TextChangeDto dto) throws InterruptedException {
        //Thread.sleep(1000);
        // codeSnippetService.updateContentById(dto.getFileId(), dto.getContent());
        String originalContent = codeSnippetService.getContentByIdAndDataVersion(dto.getFileId(), dto.getOriginalDataVersion());
        var codeSnippet = codeSnippetService.getCodeSnippetById(dto.getFileId());
        if (originalContent == null) {
            originalContent = codeSnippet.getContent();
        }

        DiffResult diffResult = DiffService.findDiffIndexes(originalContent, dto.getContent());
        codeSnippetService.saveInDb(dto.getFileId(), dto.getContent(), diffResult);
        dto.setOriginalDataVersion(codeSnippet.getDataVersion() + 1);
        return dto;
    }
}