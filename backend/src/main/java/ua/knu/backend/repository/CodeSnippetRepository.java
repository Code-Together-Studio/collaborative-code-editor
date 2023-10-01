package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.CodeSnippet;

public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, Integer> {
}
