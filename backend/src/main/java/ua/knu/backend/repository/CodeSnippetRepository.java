package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.CodeSnippet;

import java.util.List;

public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Integer> {

    void deleteAllByFolderId(Integer folderId);

    List<CodeSnippet> getAllByFolderId(Integer folderId);
}
