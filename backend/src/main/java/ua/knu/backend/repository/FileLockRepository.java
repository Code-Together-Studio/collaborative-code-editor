package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.FileLock;

public interface FileLockRepository extends JpaRepository<FileLock, Integer> {
}
