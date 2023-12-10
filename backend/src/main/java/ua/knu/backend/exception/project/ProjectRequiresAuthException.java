package ua.knu.backend.exception.project;

public class ProjectRequiresAuthException extends RuntimeException{
    public ProjectRequiresAuthException(String projectTitle) {
        super(String.format("Project \"%s\" requires authentication!", projectTitle));
    }
}
