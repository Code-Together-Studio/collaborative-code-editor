package ua.knu.backend.exception.project;

public class ProjectWithTitleExistsException extends RuntimeException {
    public ProjectWithTitleExistsException(String message) {
        super("title {" + message+"} exist");
    }
}
