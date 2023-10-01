package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.Session;

public interface SessionRepository extends JpaRepository<Session, Integer> {
}
