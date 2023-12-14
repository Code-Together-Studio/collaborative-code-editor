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
        // codeSnippetService.updateContentById(dto.getFileId(), dto.getContent());
        String originalContent = codeSnippetService.getContentByIdAndDataVersion(dto.getFileId(), dto.getOriginalDataVersion());
        var codeSnippet = codeSnippetService.getCodeSnippetById(dto.getFileId());
        if (originalContent == null) {
            originalContent = codeSnippet.getContent();
        }

        DiffResult diffResult = DiffService.findDiffIndexes(originalContent, dto.getContent());

        var diffResultNew = codeSnippetService.getNewDiffResult(dto.getFileId(), dto.getOriginalDataVersion(), diffResult);

        if (diffResultNew == null) {
            codeSnippetService.saveInDb(dto.getFileId(), dto.getContent(), diffResult);
        }
        else {
            StringBuilder builder = new StringBuilder(codeSnippet.getContent());
            String newChar = dto.getContent().charAt(diffResult.getStartIndex()) + "";
            builder.insert(diffResultNew.getStartIndex(), newChar);
            codeSnippetService.saveInDb(dto.getFileId(), builder.toString(), diffResultNew);
            dto.setContent(builder.toString());

        }
        dto.setOriginalDataVersion(codeSnippet.getDataVersion() + 1);
        return dto;
    }
}