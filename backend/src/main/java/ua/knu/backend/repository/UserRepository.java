package ua.knu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.knu.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
