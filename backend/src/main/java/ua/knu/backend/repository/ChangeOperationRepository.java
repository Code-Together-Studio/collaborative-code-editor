package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.ChangeOperation;

import java.util.List;

public interface ChangeOperationRepository extends JpaRepository<ChangeOperation, Integer> {

    ChangeOperation findByCodeSnippetIdAndDataVersion(Integer codeSnippetId, Integer dataVersion);
    List<ChangeOperation> findByCodeSnippetIdAndDataVersionGreaterThanEqual(Integer codeSnippetId, Integer dataVersion);
}
