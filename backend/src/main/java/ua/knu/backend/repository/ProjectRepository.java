package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.Project;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
}
