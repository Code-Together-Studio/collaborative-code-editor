package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.knu.backend.entity.Project;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Integer> {

    @Query(value = """
                    SELECT *
                    FROM projects
                    WHERE authenticated_only = 0
            """, nativeQuery = true)
    List<Project> getNotRequiredAuthenticationProjects();

    Optional<Project> findByTitle(String title);
}
