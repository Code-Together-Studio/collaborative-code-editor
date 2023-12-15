package ua.knu.backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import ua.knu.backend.entity.FileLock;
import ua.knu.backend.helpers.DiffResult;
import ua.knu.backend.helpers.DiffService;
import ua.knu.backend.service.CodeSnippetService;
import ua.knu.backend.service.FileLockService;
import ua.knu.backend.web.dto.InitDto;
import ua.knu.backend.web.dto.TextChangeDto;

@Controller
public class WebSocketController {

    private final CodeSnippetService codeSnippetService;
    private final FileLockService fileLockService;

    public WebSocketController(CodeSnippetService codeSnippetService, FileLockService fileLockService) {
        this.codeSnippetService = codeSnippetService;
        this.fileLockService = fileLockService;
    }


    @EventListener
    public void handleSessionDisconnected(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        this.fileLockService.Unlock(sessionId);
    }
    @MessageMapping("/init")
    public void handleInit(InitDto dto, SimpMessageHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        this.fileLockService.Lock(dto.getFileId(), sessionId);
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