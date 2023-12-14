package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.ChangeOperation;

public interface ChangeOperationRepository extends JpaRepository<ChangeOperation, Integer> {

    ChangeOperation findByCodeSnippetIdAndDataVersion(Integer codeSnippetId, Integer dataVersion);
}
