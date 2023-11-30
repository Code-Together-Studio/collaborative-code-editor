package ua.knu.backend.controller;

import org.springframework.web.bind.annotation.*;
import ua.knu.backend.service.FolderService;
import ua.knu.backend.web.dto.FolderDto;
import ua.knu.backend.web.mapper.FolderMapper;

import java.util.List;

@RestController
@RequestMapping("/folders")
public class FolderController {

    private final FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/{id}")
    public FolderDto getFolderById(@PathVariable Integer id) {
        return FolderMapper.toDto(folderService.getFolderById(id));
    }

    @PostMapping("/create")
    public FolderDto createFolder(@RequestParam Integer parentFolderId, @RequestParam String name) {
        return FolderMapper.toDto(folderService.createFolder(parentFolderId, name));
    }

    @DeleteMapping("/{id}")
    public FolderDto deleteFolder(@PathVariable Integer id) {
        return FolderMapper.toDto(folderService.deleteFolder(id));
    }

    @GetMapping("/{projectId}/project-root-folders")
    public List<FolderDto> getProjectRootFoldersById(@PathVariable Integer projectId) {
        return folderService.getProjectRootFolders(projectId).stream().map(FolderMapper::toDto).toList();
    }

    @GetMapping("/{parentFolderId}/child-folders")
    public List<FolderDto> getChildFolders(@PathVariable Integer parentFolderId) {
        return folderService.getChildFolders(parentFolderId).stream().map(FolderMapper::toDto).toList();
    }
}
