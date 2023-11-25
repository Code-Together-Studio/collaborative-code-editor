package ua.knu.backend.web.mapper;

import ua.knu.backend.entity.Folder;
import ua.knu.backend.web.dto.FolderDto;

import java.time.ZoneId;

public class FolderMapper {

    public static FolderDto toDto(Folder folder){
        return new FolderDto(
                folder.getId(),
                folder.getName(),
                folder.getCreatedAt().toInstant().atZone(ZoneId.systemDefault())
                        .toLocalDateTime()
        );
    }
}
