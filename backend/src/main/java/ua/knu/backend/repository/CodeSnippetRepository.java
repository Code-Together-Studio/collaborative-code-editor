package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.knu.backend.entity.CodeSnippet;

import java.util.List;

public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Integer> {

    void deleteAllByFolderId(Integer folderId);

    @Query(value = """
                    SELECT *
                    FROM code_snippet
                    WHERE folder_id = :folderId
            """, nativeQuery = true)
    List<CodeSnippet> findByFolderId(Integer folderId);
}
