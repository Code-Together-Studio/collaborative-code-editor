package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.Folder;

public interface FolderRepository extends JpaRepository<Folder, Integer> {
}
