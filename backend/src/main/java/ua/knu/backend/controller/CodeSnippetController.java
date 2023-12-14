package ua.knu.backend.controller;

import org.springframework.web.bind.annotation.*;
import ua.knu.backend.service.CodeSnippetService;
import ua.knu.backend.web.dto.CodeSnippetDto;
import ua.knu.backend.web.dto.ContentDto;
import ua.knu.backend.web.mapper.CodeSnippetMapper;

import java.util.List;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/code-snippet")
@CrossOrigin
public class CodeSnippetController {

    private final CodeSnippetService codeSnippetService;

    public CodeSnippetController(CodeSnippetService codeSnippetService) {
        this.codeSnippetService = codeSnippetService;
    }

    @GetMapping("/{id}/content")
    public String getContentById(@PathVariable("id") Integer id) {
        return codeSnippetService.getContentById(id);
    }

    @GetMapping("/{id}")
    public CodeSnippetDto getCodeSnippedById(@PathVariable("id") Integer id) {
        return CodeSnippetMapper.toDto(codeSnippetService.getCodeSnippetById(id));
    }

    @GetMapping("/folder/{folder_id}")
    public List<CodeSnippetDto> getAllCodeSnippetsFromFolder(@PathVariable("folder_id") Integer folderId) {
        return codeSnippetService.getAllCodeSnippedsFromFolder(folderId).stream().map(CodeSnippetMapper::toDto).collect(Collectors.toList());
    }

    @GetMapping("/project/{project_id}")
    public List<CodeSnippetDto> getAllRootCodeSnippetsFromProject(@PathVariable("project_id") Integer projectId) {
        return codeSnippetService.getAllRootCodeSnippedsFromProject(projectId).stream().map(CodeSnippetMapper::toDto).collect(Collectors.toList());
    }

    @PostMapping("/{id}/content")
    public void updateContentById(@PathVariable("id") Integer id, @RequestBody ContentDto contentDto) {
        codeSnippetService.updateContentById(id, contentDto.getContent());
    }

    @PostMapping("/{id}")
    public void saveInDb(@PathVariable("id") Integer id, @RequestBody String content) {
        codeSnippetService.saveInDb(id, content, null);
    }

    @PostMapping("/folder")
    public CodeSnippetDto createInFolder(@RequestParam Integer parentFolderId, @RequestParam String name) {
        return CodeSnippetMapper.toDto(codeSnippetService.createInFolder(parentFolderId, name));
    }

    @PostMapping("/project")
    public CodeSnippetDto createInProject(@RequestParam Integer parentProjectId, @RequestParam String name) {
        return CodeSnippetMapper.toDto(codeSnippetService.createInProject(parentProjectId, name));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        codeSnippetService.deleteById(id);
    }
}
