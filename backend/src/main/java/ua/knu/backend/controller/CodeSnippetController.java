package ua.knu.backend.controller;

import org.springframework.web.bind.annotation.*;
import ua.knu.backend.entity.CodeSnippet;
import ua.knu.backend.service.CodeSnippetService;
import ua.knu.backend.web.dto.CodeSnippetDto;
import ua.knu.backend.web.mapper.CodeSnippetMapper;

@RestController
@RequestMapping("/code-snippet")
public class CodeSnippetController {

    private final CodeSnippetService codeSnippetService;

    public CodeSnippetController(CodeSnippetService codeSnippetService) {
        this.codeSnippetService = codeSnippetService;
    }

    @GetMapping("/{id}/content")
    public String getContentById(@PathVariable("id") Integer id){
        return codeSnippetService.getContentById(id);
    }

    @GetMapping("/{id}")
    public CodeSnippetDto getCodeSnippedById(@PathVariable("id") Integer id){
        return CodeSnippetMapper.toDto(codeSnippetService.getCodeSnippetById(id));
    }

    @PostMapping("/{id}/content")
    public void updateContentById(@PathVariable("id") Integer id, @RequestBody String content){
        codeSnippetService.updateContentById(id, content);
    }

    @PostMapping("/{id}")
    public void saveInDb(@PathVariable("id") Integer id, @RequestBody CodeSnippetDto codeSnippetDto){
        codeSnippetService.saveInDb(CodeSnippetMapper.toEntity(codeSnippetDto));
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Integer id){
        codeSnippetService.deleteById(id);
    }
}
