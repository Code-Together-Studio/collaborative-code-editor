package ua.knu.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ua.knu.backend.entity.Folder;
import ua.knu.backend.service.FolderService;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/folders")
@RequiredArgsConstructor
public class FolderController {
    private final FolderService folderService;

    @GetMapping("/{id}")
    public String getFolderById(@PathVariable Integer id) {
        return folderService.getFolderById(id).toString();
    }

    @PostMapping("/create")
    public String createFolder(@RequestParam Integer parentFolderId,
                               @RequestParam String name){

        return folderService.createFolder(parentFolderId, name).toString();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFolder(@PathVariable Integer id){
        return folderService.deleteFolder(id).toString();
    }

    @GetMapping("/{projectId}/root-folders")
    public String getProjectRootFoldersById(@PathVariable Integer projectId){
        return folderService.getProjectRootFolders(projectId).stream().map(Folder::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/{projectTitle}/root-folders")
    public String getProjectRootFoldersByTitle(@PathVariable Integer projectTitle){
        return folderService.getProjectRootFolders(projectTitle).stream().map(Folder::toString).collect(Collectors.joining("\n"));
    }

    @GetMapping("/{parentFolderId}/child-folders")
    public String getChildFolders(@PathVariable Integer parentFolderId){
        return folderService.getChildFolders(parentFolderId).stream().map(Folder::toString).collect(Collectors.joining("\n"));
    }
}
