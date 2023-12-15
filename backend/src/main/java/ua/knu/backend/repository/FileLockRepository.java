package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.ChangeOperation;
import ua.knu.backend.entity.FileLock;

import java.util.List;

public interface FileLockRepository extends JpaRepository<FileLock, Integer> {
    FileLock findByFileIdAndUserSessionId(Integer fileId, String userSessionId);
    FileLock findByUserSessionId(String userSessionId);

    List<FileLock> getAllByFileIdAndUserSessionIdNot(Integer fileId, String userSessionId);
}
