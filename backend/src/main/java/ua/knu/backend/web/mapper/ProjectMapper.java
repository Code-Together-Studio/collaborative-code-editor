package ua.knu.backend.web.mapper;

import ua.knu.backend.entity.Project;
import ua.knu.backend.web.dto.ProjectDto;

import java.time.ZoneId;

public class ProjectMapper {

    public static ProjectDto toDto(Project project) {
        return new ProjectDto(
                project.getId(),
                project.getTitle(),
                project.getHiddenRootFolderId(),
                project.getCreatedAt().toInstant().atZone(ZoneId.systemDefault())
                        .toLocalDateTime(),
                project.isAuthenticatedOnly()
        );
    }
}
